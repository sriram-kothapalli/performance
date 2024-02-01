const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pom/login');
const { HomePage } = require('../pom/home');
const fs = require('fs');
require('dotenv/config');
const { equipmentSelection, equipmentConfirmation, equipmentOperation, validateHeaders, request, runBox, resultConfirmation, loadingContent, logout } = require('../pom/utilis');
const { userEquipmentMap } = require('../fixture/users');
const { addProtocolsExportAndComplete } = require('../pom/sim');

for (const username in userEquipmentMap) {
  const { deviceType, equipment, simUI } = userEquipmentMap[username];

  test(`${deviceType}: ${username} - ${equipment} - ${simUI}`, async ({ page }) => {
    test.setTimeout(30 * 60 * 1000);
    await page.goto('https://124.123.26.241:3005/merck/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(8000);
    await page.waitForFunction(() => window.location.href.includes('/login'), { timeout: 10000, polling: 1000 });
    await LoginPage.login(username, process.env.PASSWORD, page);
    await page.waitForTimeout(8000);
    await page.waitForFunction(() => window.location.href.includes('/device_type'), { timeout: 10000, polling: 1000 });
    await page.waitForTimeout(8000);

    if (deviceType === 'pH Meter') {
      await HomePage.selectDeviceType('pH Meter', page);
      await page.waitForFunction(() => window.location.href.includes('/PhMeter/device_list'), { timeout: 10000, polling: 1000 });
      await equipmentSelection(equipment, page);
      await equipmentConfirmation(page);
      await page.waitForFunction(() => {
        const element = document.querySelector('.col-md-12 .q-btn__content.text-center');
        return element && element.innerText === 'Release';
      }, { timeout: 1 * 60 * 1000 });

      for (let i = 0; i < process.env.ITERATION; i++) {
        await equipmentOperation('pH MEAS', equipment, page).then(async () => {
          await validateHeaders(["pH", "Signal", "Temperature"], page);
          await request(`${simUI}/uicallback?p1=manualendpoint`);
          await page.waitForFunction(() => {
            const element = document.querySelector('.col-6.text-right button');
            return element && element.innerText === 'Complete';
          }, { timeout: 1 * 60 * 1000 });
          await page.getByRole('button', { name: 'Complete' }).click();
        });

        await resultConfirmation(equipment, page).then(async () => {
          await page.waitForFunction(() => {
            const element = document.querySelector('.col-md-12 .q-btn__content.text-center');
            return element && element.innerText === 'Release';
          }, { timeout: 1 * 60 * 1000 });
        });

        const jsHeapSize = await page.evaluate(() => {
          const perf = window.performance;
          return perf && perf.memory ? perf.memory.totalJSHeapSize / (1024 * 1024) : null;
        });

        const currentTimeIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const fileExists = fs.existsSync('performance_metrics.csv');

        if (!fileExists) {
          fs.writeFileSync('performance_metrics.csv', 'Username,JS_Heap_Size_MB,Date,Time,Equipment,DeviceType', 'utf-8');
        }

        const csvData = `\n${username},${jsHeapSize},${currentTimeIST.split(',')[0]},${currentTimeIST.split(',')[1]},${equipment},${deviceType}`;
        fs.appendFileSync('performance_metrics.csv', csvData, 'utf-8');
      }
    } else if (deviceType === 'Conductivity Meter') {
      await HomePage.selectDeviceType('Conductivity Meter', page);
      await page.waitForFunction(() => window.location.href.includes('/conductivity_meter/device_list'), { timeout: 10000, polling: 1000 });
      await equipmentSelection(equipment, page);
      await equipmentConfirmation(page);
      await page.waitForFunction(() => {
        const element = document.querySelector('.col-md-12 .q-btn__content.text-center');
        return element && element.innerText === 'Release';
      }, { timeout: 1 * 60 * 1000 });
      for (let i = 0; i < process.env.ITERATION; i++) {
        await equipmentOperation('Cond Meas', equipment, page).then(async () => {
          await validateHeaders(["Value", "Temperature"], page);
          await request(`${simUI}/uicallback?p1=manualendpoint`);
          await page.waitForFunction(() => {
            const element = document.querySelector('.col-6.text-right button');
            return element && element.innerText === 'Complete';
          }, { timeout: 1 * 60 * 1000 });
          await page.getByRole('button', { name: 'Complete' }).click();
        });
        await resultConfirmation(equipment, page).then(async () => {
          await page.waitForFunction(() => {
            const element = document.querySelector('.col-md-12 .q-btn__content.text-center');
            return element && element.innerText === 'Release';
          }, { timeout: 1 * 60 * 1000 });
        });
        const jsHeapSize = await page.evaluate(() => {
          const perf = window.performance;
          return perf && perf.memory ? perf.memory.totalJSHeapSize / (1024 * 1024) : null;
        });
        const currentTimeIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const fileExists = fs.existsSync('performance_metrics.csv');
        if (!fileExists) {
          fs.writeFileSync('performance_metrics.csv', 'Username,JS_Heap_Size_MB,Date,Time,Equipment,DeviceType', 'utf-8');
        }
        const csvData = `\n${username},${jsHeapSize},${currentTimeIST.split(',')[0]},${currentTimeIST.split(',')[1]},${equipment},${deviceType}`;
        fs.appendFileSync('performance_metrics.csv', csvData, 'utf-8');
      }

    } else if (deviceType === 'Balance') {
      await HomePage.selectDeviceType('Balance', page);
      await page.waitForFunction(() => window.location.href.includes('/balance/device_list'), { timeout: 10000, polling: 1000 });
      await equipmentSelection(equipment, page);
      await equipmentConfirmation(page);
      await page.waitForFunction(() => {
        const element = document.querySelector('.col-md-12 .q-btn__content.text-center');
        return element && element.innerText === 'Release';
      }, { timeout: 1 * 60 * 1000 });

      for (let i = 0; i < process.env.ITERATION; i++) {
        await addProtocolsExportAndComplete(2, "Dynamic Weighing", "Animal Weighing", simUI);
        await validateHeaders(["Sequence ID", "Animal ID", "Weight", "Tare", "Router Time", "Stable"], page);
        await page.waitForFunction(() => {
          const element = document.querySelector('.q-pr-md .q-btn__content.text-center');
          return element && element.innerText === 'Complete';
        }, { timeout: 1 * 60 * 1000 });
        await page.getByRole('button', { name: 'Complete' }).click();

        await resultConfirmation(equipment, page).then(async () => {
          await page.waitForFunction(() => {
            const element = document.querySelector('.col-md-12 .q-btn__content.text-center');
            return element && element.innerText === 'Release';
          }, { timeout: 1 * 60 * 1000 });
        });

        const jsHeapSize = await page.evaluate(() => {
          const perf = window.performance;
          return perf && perf.memory ? perf.memory.totalJSHeapSize / (1024 * 1024) : null;
        });
        const currentTimeIST = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const fileExists = fs.existsSync('performance_metrics.csv');

        if (!fileExists) {
          fs.writeFileSync('performance_metrics.csv', 'Username,JS_Heap_Size_MB,Date,Time,Equipment,DeviceType', 'utf-8');
        }

        const csvData = `\n${username},${jsHeapSize},${currentTimeIST.split(',')[0]},${currentTimeIST.split(',')[1]},${equipment},${deviceType}`;
        fs.appendFileSync('performance_metrics.csv', csvData, 'utf-8');
      }
    }

    await page.getByRole('button', { name: 'Release' }).click();
    await logout('Are you sure to log out?', page);
  });
}
