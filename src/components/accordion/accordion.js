import React, { useState } from "react";
import questions from "./questions";
import { MdAdd, MdRemove } from "react-icons/md";
import "./accordion.css";

const Accordion = ({ question, answer }) => {
    const [show, setShow] = useState(false);

    const toggleAnswer = () => {
        setShow(!show);
    };

    return (
        <div className="accordion">
        <div className={`question-box ${show ? 'selected' : ''}`} onClick={toggleAnswer}>
                <div className="ques-ans-div">
                    <h3>{question}</h3>
                    <div className="icon-div">
                        {show ? <MdRemove /> : <MdAdd />}
                    </div>
                </div>
            </div>
            {show && (
                <div className="answer-box">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

const FAQ = () => {
    const [data] = useState(questions);
    return (
        <div className="faq-div">
            <div className="faq-instr">
                <p>Faceți click pe întrebare pentru a vedea răspunsul.</p>
            </div>
            <div className="faq-box-part">
                {data.map((item) => {
                    return <Accordion key={item.id} question={item.question} answer={item.answer} />;
                })}
            </div>
        </div>
    );
};

export default FAQ;
