import { expect } from '@playwright/test';

export class LoginPage {
    static async userDetails(label, value, page) {
        const mainBgElement = await page.$('.mainBg');
        const labelElement = await mainBgElement.$(`.label:has-text("${label}")`);
        const qFieldElement = await labelElement.evaluateHandle(label => {
            return label.nextElementSibling;
        });
        const inputField = await qFieldElement.$('input');
        await inputField.type(value);
    }

    static async login(user, pwd, page) {
        await this.userDetails('Username', user, page);
        await this.userDetails('Password', pwd, page);
        const button = await page.$('.q-btn__content');
        const buttonText = await page.evaluate(button => button.innerText, button);
        expect(buttonText.trim()).toEqual('SIGN IN');
        await button.click();
    }
}
