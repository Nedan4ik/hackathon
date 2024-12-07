const domParser = require('node-html-parser').parse;
const axios = require('axios');
const fs = require("node:fs");

const utils = class {
    static async fetch_(url = '', type = 'POST', body = {}) {
        try {
            const method = type.toUpperCase();
            const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

            if (!validMethods.includes(method)) {
                console.log(`Invalid HTTP method: ${method}`);
                return;
            }

            let options = {
                method: method,
                url: url,
            };

            if (method === 'POST' || method === 'PUT') {
                options.data = body;
            }

            console.log(options);

            const response = await axios(options);
            return response.data;
        } catch (e) {
            console.log(`Произошла ошибка: ${e}`);
        }
    }

    static hookEvents(objects = [null], events = [''], methods = [function () {
    }]) {
        if (objects.includes(null)) return;
        if (events.length === 0) return;

        for (const event of events) {
            const index = events.indexOf(event);
            const obj = objects[index];
            const func = methods[index];

            if (obj && typeof func === 'function') {
                obj.on(event, (...args) => func(...args));
            }
        }
    }

    static parseJSONData(el) {
        const json = {};

        const accordion = el.querySelector('.accordion');
        const tileContent = accordion.querySelector('.tile-content');
        const title = tileContent.querySelector('.accordion-header').innerHTML;
        const data = tileContent.querySelector('.tile-subtitle').innerHTML;
        const codeElements = accordion.querySelector('.centered .code').innerHTML;

        const code = codeElements.replace(/<[^>]+>/g, '').trim();
        const firstElement = code.split('\n')[0];

        const match = firstElement.match(/id=([A-Za-z0-9-]+)/);
        const id = match[1];

        const btnGroup = accordion.querySelector('.btn-group');

        let sourceButton = null;

        for (const button of btnGroup.querySelectorAll('button')) {
            if (button.innerHTML === 'Source')
                sourceButton = button;
        }

        json.title = title;
        json.date = data;
        json.info = code;
        json.id = id;
        json.source = firstElement.replaceAll('## ', '');

        return json;
    }
}

module.exports.utils = utils;

const puppeteer = require('puppeteer');

const API_KEY = 'j80xkpuMrO7DCwgPsSe0zjQSSMINuDhrei6HhdtHZjjDHHfdj9HzzIv0br3WhrWx';

async function searchVulnerabilities(ip) {
    try {
        const url = `https://viz.greynoise.io/query/${ip}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка при запросе: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);

    } catch (error) {
        console.error('Ошибка при получении информации:', error.message);
    }
}

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');

    await page.goto('https://sploitus.com/?query=POC#exploits_');

    await page.waitForSelector('.panel');

    const pon = await page.content();
    const dom = domParser(pon);
    const els = dom.querySelectorAll('.panel');
    for (const el of els) {
        console.log(utils.parseJSONData(el));
    }

    await browser.close();
})();