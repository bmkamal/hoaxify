import React from "react";
import { queryByPlaceholderText, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserSignUpPage from "./UserSignupPage"

describe("UserSignUpPage", () => {

    describe("Layout", () => {

        it("has header of signup", () => {
            const {container} = render(<UserSignUpPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });
        it('has input for display name', ( ) => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has input for username', ( ) => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const userNameInput = queryByPlaceholderText('Your username');
            expect(userNameInput).toBeInTheDocument();
        });
        it('has input for password', ( ) => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password input', ( ) => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has input for Repeat password', ( ) => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');
            expect(passwordRepeatInput).toBeInTheDocument();
        });
        it('has Repeat password type for password input', ( ) => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordRepeatInput = queryByPlaceholderText('Your password');
            expect(passwordRepeatInput.type).toBe('password');
        });
        it('has submit button', ( ) => {
            const { container } = render(<UserSignUpPage/>);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });

    });
    describe("Interactions", () => {
        const changeEvent = (content) => {
            return {
                target: {
                value: content}
            }
        };
        let button, displayNameInput, userNameInput, passwordInput, repeatPasswordInput;
        const setupForSubmit = (props) => {
            const rendered = render(<UserSignUpPage {...props} />);
            const { container, queryByPlaceholderText } = rendered;
            
            displayNameInput = queryByPlaceholderText('Your display name');
            userNameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            repeatPasswordInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, 'my-display-name');
            fireEvent.change(userNameInput, 'my-user-name');
            fireEvent.change(passwordInput, 'pass4wd');
            fireEvent.change(repeatPasswordInput, 'pass4wd');

            button = container.querySelector('button');
            
            return rendered;
        }
        
        it('sets the display name value into state', () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const displayNameInput = queryByPlaceholderText('Your display name');
            
            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            
            expect(displayNameInput).toHaveValue('my-display-name');
        });
        
        it('sets the user name value into state', () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const userNameInput = queryByPlaceholderText('Your username');
            
            fireEvent.change(userNameInput, changeEvent('my-user-name'));
            
            expect(userNameInput).toHaveValue('my-user-name');
        });
        
        it('sets the password value into state', () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const passwordInput = queryByPlaceholderText('Your password');
            
            fireEvent.change(passwordInput, changeEvent('passw4d'));
            
            expect(passwordInput).toHaveValue('passw4d');
        });
        
        it('sets the repeat password value into state', () => {
            const {queryByPlaceholderText} = render(<UserSignUpPage/>);
            const repeatPasswordInput = queryByPlaceholderText('Repeat your password');
            
            fireEvent.change(repeatPasswordInput, changeEvent('passw4d'));
            
            expect(repeatPasswordInput).toHaveValue('passw4d');
        });
        
        it("calls postSignup when fields are correct and action provided in props",() => {
            const actions = {
                postSignup : jest.fn().mockResolvedValueOnce({}),
            };
            setupForSubmit({actions});
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        
        it("does not throw exception when actions provded in props",() => {
            setupForSubmit();
            expect(() => {fireEvent.click(button)}).not.toThrow();
        });
        it("post with user body when the fields are valid",() => {
            const actions = {
                postSignup : jest.fn().mockResolvedValueOnce({}),
            };
            setupForSubmit({ actions });
            fireEvent.click(button);
            const expectedUserObject = {
                userame: 'my-user-name',
                displayName: 'my-display-name',
                password: 'pass4wd',
            };
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });
    });
});


