/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import {Player, Year, User} from '../sqldb';
import csv from 'csv';

import fs from 'fs';

let seedDir = "./server/config/seedData";
let csvList = fs.readdirSync(seedDir);
let promisifyCB = (func, params) => {
	return new Promise((resolve, reject) => {
		func(...params, (err, data) => {
			err && reject(err);
			resolve(data);
		})
	})
}

let filteredcsvList = csvList.filter(csv => !/^\.\~/.test(csv) && /\.csv$/.test(csv));
let filteredcsvPromise = filteredcsvList.map(csv => promisifyCB(fs.readFile, [`${seedDir}/${csv}`, `utf8`]));

function createYearObj (obj, year) {
	var stats = {};
	for (var key in obj) {
		if (key !== "position" && key !== "name" && key !== "name_info") {
			var stat = (obj[key] === 'NA' || obj[key] === '')  ? null : obj[key];
			stats[key] = stat;
		}
	}
	stats.year = year;
	return stats;
}

function createPlayerObj (obj, year) {
	var player = {
		Years: [],
	};
	var stats = {};
	for (var key in obj) {
		if (key === "position" || key === "name" || key === "name_info") {
			player[key] = obj[key];
		} else if (key === "age") {
			player.birthyear = (obj[key] === 'NA' || obj[key] === '') ? null : (year - obj[key]);
			stats[key] = player.birthyear;
		} else {
			var stat = (obj[key] === 'NA' || obj[key] === '')  ? null : obj[key];
			stats[key] = stat;
		}
	}
	stats.year = year; 
	player.Years.push(stats);
	return player;
}
Player.destroy({ where: {} })
	.then(() => {
		console.log("Players purged");
		return Player.sync({force: true})
	}).then(() => {
		console.log("Players synced");
		return Year.destroy({ where: {} });
	}).then(() => {
		console.log("Years purged");
		return Year.sync({force: true});
	}).then(() => {
		console.log("Years synced");
		return Promise.all(filteredcsvPromise); 
	}).then(data => {
		let csvParser = csv.parse.bind(csv);
		let csvParsePromiseArr = data.map(csv => promisifyCB(csvParser, [csv, {auto_parse: true, columns: true}]));
		return Promise.all(csvParsePromiseArr);
	}).then(parsedCSV => {
		let playerTrack = {};
		let playerCreator = [];
		parsedCSV.forEach((year, idx) => {
			var yearCount = idx+2005;
			year.forEach(player => {
				if (playerTrack[player.name] || playerTrack[player.name] === 0) {
					playerCreator[playerTrack[player.name]].Years.push(createYearObj(player, yearCount));
				} else {
					playerTrack[player.name] = playerCreator.length;
					playerCreator.push(createPlayerObj(player, yearCount));
				}
			})
		}); 
		let creationPromise = playerCreator.map(player => Player.create(player, {include: [Year]}))
		console.log("about to create all");
		return Promise.all(creationPromise);
	}).then(createdPlayers => console.log(createdPlayers.length))
	.catch(err => console.error(`error on parse csv ${err}`))




// User.sync({force: true})
//   .then(() => User.destroy({ where: {} }))
//   .then(() => {
//     User.bulkCreate([{
//       provider: 'local',
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'test'
//     }, {
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin'
//     }])
//     .then(() => {
//       console.log('finished populating users');
//     });
//   });










