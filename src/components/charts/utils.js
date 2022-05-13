import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import MSFT from './MSFT.tsv';
import MSFTSummary from './MSFTSummary.tsv';

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData(link) {
	const promiseMSFT = fetch(link)
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

export function readData() {
	const promiseMSFT = fetch(MSFT)
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}

export function readTSVData() {
    const promiseMSFT = fetch(MSFTSummary)
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}