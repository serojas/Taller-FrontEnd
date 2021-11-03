import { useTranslation } from 'react-i18next';
import { GenericResponse } from './../model/genericResponse';
import { Project } from './../model/project';
import { AboutMe } from "../model/aboutme";

import projects from "../data/projects";
import { v4 as uuidv4 } from 'uuid';


export const mockLogin = (userName: string, password: string) => new Promise<TokenResponse>(function (resolve, rejected) {
    setTimeout(() => {
        if (userName === "serojas_17@yahoo.com" && password === "Passw0rd") {
            resolve(JSON.parse(
                `{
                 "access_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOnsidXNlcklkIjo2NjYsInJvbGUiOiJhZG1pbiIsInVzZXJOYW1lIjoiYWRtaW4iLCJkaXNwbGF5TmFtZSI6ImFkbWluIn0sImlhdCI6MTYwMTAyNzU1MywibmJmIjoxNjAxMDI3NTUzLCJleHAiOjE2MDExMTM5NTN9.vHgVtxKGmwDDLLVuT63UBkP8xe4a9hH0B3kkCsAh7K8",
                 "expires_in": 3600,
                 "token_type": "bearer"
                 }`
            ));
        } else {
            rejected(new Unauthorized());
        }
    }, 2000);
    
})
export interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
export interface ApiError {
    description?: string;
}
export class Unauthorized implements ApiError { }



export const mockAboutme = () => new Promise<AboutMe>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(
            `{
            "id":"12389asdfasf8",
            "name":"Sonia Rojas",
            "birthday":587883600000,
            "nationality":"Ecuadorian",
            "job":"Full Stack Developer on Technisys",
            "github":"https://github.com/serojas"
            }`
        ));
    }, 500);

});

export const mockAddProject =(title: string, description: string, tag: string, link: string, version: string )=> new Promise<GenericResponse>(function (resolve, rejected) {
    setTimeout(() => {
        try{
            let element= {id: uuidv4(), title: title, description: description, version: version, link: link ,tag: tag, timestamp:"765817712000"};
            projects.push(element);
            resolve(JSON.parse(`{"code": "200", "message":"ok"}`));

        }catch(e){
            const { t } = useTranslation();
            let error = t("project.error_adding");   
            rejected(JSON.parse(`{"code": "500", "message":${error}}`));

        }
    }, 500);
    

});

export const mockProjects = () => new Promise<Project[]>(function (resolve, rejected) {
    setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(projects)));
    }, 500);

});