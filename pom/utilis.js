import { expect, test } from '@playwright/test';


export async function equipmentSelection(serialNumber, page) {
    await page.type('[placeholder="Search"]', serialNumber)//Search Serial At Step 1
    await page.click('.q-field i:last-child');//Click on Search Button
    await page.waitForTimeout(5000)
    await page.locator('.q-checkbox__check').click({ timeout: 100000 });//Select Checkbox
    await page.waitForFunction(() => {
        const element = document.querySelector('.balance-primary-button');
        return element && element.innerText === 'Next';
    }, { timeout: 3 * 60 * 1000 });
    await page.locator('.balance-primary-button').click({ timeout: 100000 });//Click on Next
}


export async function equipmentConfirmation(page) {
    await page.waitForFunction(() => {
        const element = document.querySelector('.balance-primary-button');
        return element && element.innerText === 'Confirm';
    }, { timeout: 1 * 60 * 1000 });
    await page.locator('.balance-primary-button').click({ timeout: 100000 });
}

export async function equipmentOperation(optionValue, sampleid, page) {
    await page.waitForLoadState('networkidle');
    await page.locator('.methodTitle:text-is("Run")').innerText();
    await page.locator('.col-4.q-pr-sm:text-is("Equipment Method")').innerText();
    await page.getByRole('combobox').selectOption(`${optionValue}`);
    if (optionValue === 'pH MEAS' || optionValue === 'Cond Check' || optionValue === 'Cond Meas') {
        await page.locator('.col-4.q-pr-sm:text-is("Sample ID *")').innerText();
        await page.locator('.method-selection input').type(sampleid);
    }
    await page.getByRole('button', { name: 'Start' }).click({ timeout: 100000 });
}


export const request = async (apiUrl, timeout = 2000) => {
    const response = await fetch(apiUrl);
    await new Promise(resolve => setTimeout(resolve, timeout));
    return response.json();
};
export const validateHeaders = async (expectedHeaders, page) => {
    await Promise.all(expectedHeaders.map(async (label, index) => {
        await page.waitForFunction(() => document.querySelector('.eachCol').innerText.trim());
        expect(await page.locator(`.eachCol:nth-child(${index + 1}) p`).innerText()).toEqual(label);
    }));
};

export async function resultConfirmation(equipment, page) {
    await page.waitForFunction(() => {
        const element = document.querySelector('[type="button"] .q-btn__content');
        return element && element.innerText === 'Confirm';
    }, { timeout: 1 * 60 * 1000 });
    await page.locator('[type="textarea"]').type(equipment);
    await page.getByRole('button', { name: 'Confirm' }).click({ timeout: 10000 });
}


export async function logout(warnigtext, page) {
    await page.locator('.unfold-logout .tab-item').click({ timeout: 100000 }); //Click on Logout Button
    const test = await page.locator(`.warning-text:has-text("${warnigtext}")`).innerText(); // Validating the Text `Are you sure to log out?`
    expect(test).toEqual(warnigtext)
    await page.locator('.confirmDialog>.justify-center>button:first-of-type').click({ timeout: 100000 }); // Confirming the Logout
    await page.waitForTimeout(5000); // Waiting for 5 Seconds
    await page.waitForFunction(() => window.location.href.includes('merck/login'), { timeout: 100000, polling: 1000 });// Waiting Until merck/login is there on URL
}

