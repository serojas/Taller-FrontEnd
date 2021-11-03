import React, { ChangeEvent,  MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import styled from "styled-components"
import useApp from "../../hooks/useApp";
import { GenericResponse } from "../../model/genericResponse";
import { themes } from "../../styles/ColorStyles";
import { H1 } from "../../styles/TextStyles";
import { mockAddProject } from "../../utils/mock-response";



const NewProjectCard = () => {
    let history = useHistory();

    const { addNotification, removeLastNotification } = useApp();
    const { t } = useTranslation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [version, setVersion] = useState("");
    const [link, setLink] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


    async function addProject(event: MouseEvent<HTMLElement>) {
        event.preventDefault();
        if (!readyToSubmit()) {
          setErrorMsg(t("login.err_usr_pass"));
          return;
        }
    
        try {
          addNotification(t("loader.text"));
          const response: GenericResponse =  await mockAddProject(title, description, tag, link, version);      
          if(response.code === "200"){
              history.replace('/dashboard');
          } else{
            setErrorMsg(response.message);

          }   
          
        } catch (e) {
          setErrorMsg(t("project.error_adding"));
          console.log(e);
        } finally {
          removeLastNotification();
        }
    }

    function readyToSubmit(): boolean {
        return title !== "" && description !== "";
    }

    function onChangeAnyInput() {
        setErrorMsg("");
    }
    
    function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value);
        onChangeAnyInput();
    }
    
    function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
        onChangeAnyInput();
    }

    function onChangeTag(e: ChangeEvent<HTMLInputElement>) {
        setTag(e.target.value);
        onChangeAnyInput();
    }

    function onChangeLink(e: ChangeEvent<HTMLInputElement>) {
        setLink(e.target.value);
        onChangeAnyInput();
    }
    function onChangeVersion(e: ChangeEvent<HTMLInputElement>) {
        setVersion(e.target.value);
        onChangeAnyInput();
    }
  
    return (    
        <Wrapper>
             <TitleForm>Project Input</TitleForm>
            <ContentWrapper>
                <CardInput>
                    <InputText name="title" type="text" placeholder={t("project.title")} value={title} onChange={onChangeTitle}></InputText>
                    <InputText name="description" type="text" placeholder={t("project.description")} value={description} onChange={onChangeDescription}></InputText>
                    <InputText name="tags" type="text" placeholder={t("project.tags")} value={tag} onChange={onChangeTag}></InputText>
                    <InputText name="link" type="text" placeholder={t("project.link")} value={link} onChange={onChangeLink}></InputText>
                    <InputText name="version" type="text" placeholder={t("project.version")} value={version} onChange={onChangeVersion}></InputText>
                    <ButtonInput>
                        <CancelButtonForm type="submit" value={t("project.button_delete") != null ? t("project.button_delete") as string : "Delete"} />
                        <OkButtonForm type="submit" value={t("project.button_post") != null ? t("project.button_post") as string : "Post"} onClick={addProject}/>
                    </ButtonInput>
                </CardInput>
            </ContentWrapper>
        </Wrapper>
    
    )
};

export default NewProjectCard

const TitleForm = styled(H1)`
  margin-top:40px;
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`
const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 40px auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }
`;
const CardInput =  styled.form`
  padding: 20px 40px;
  width: 545px;
  ${themes.light.card};
  border-radius: 8px;
  
  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;
  
  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }
  
  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
  }


`;

const ButtonInput =  styled.div`
   display: flex;
   flex-wrap: nowrap;
   justify-content: flex-end;
`
const InputText = styled.input`
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 44px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundColor};
  padding-left: 8px;
`

const OkButtonForm = styled.input`
  width: 108px;
  height: 36px;
  border-radius: 4px;
  border: none;
  padding: 11px;
  margin: 0px 9.64778px;
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};
  text-align: center;

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.light.primary};
  }
`;

const CancelButtonForm = styled.input`
  width: 108px;
  height: 36px;
  border-radius: 4px;
  border: none;
  padding: 11px;
  margin: 0px 9.64778px;
  background-color: ${themes.light.warning};
  color: ${themes.dark.text1};
  text-align: center;

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.light.primary};
  }
`;