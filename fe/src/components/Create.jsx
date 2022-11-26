import {React, useState} from 'react'
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage/dist/bundle.esm.min.js";
import { apiKey } from '../creds/creds';
import { mintNFT } from '../utils/opertions';
import { Header } from './Header';

const client = new NFTStorage({ token: apiKey });

export const Create = () => {
    const [openFileSelector, { filesContent }] = useFilePicker({
        accept: [".png", ".jpg", ".jpeg"],
        multiple: false,
        readAs: "ArrayBuffer",
    });
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [contact, setContact] = useState("");
    const [yoe, setYoe] = useState("");    // years of experience
    const [skills, setSkills] = useState("");
    const [latestEdu, setLatestEdu] = useState("");
    const [description, setDescription] = useState("");
    const [symbol, setSymbol] = useState("");
    const [amount, setAmount] = useState("0");
    const [error, setError] = useState("");
    const [loadingSubmit, setLoading] = useState(false);
    const [linkedInUrl, setLinkedInUrl] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            description === "" ||
            symbol === "" ||
            amount === "" ||
            !/^-?\d+$/.test(amount) ||
            filesContent.length === 0
        ) {
            setError("Some Error Occurred. Please check entered details.");
            return;
        }
        setLoading(true);
        setError("");

        (async () => {
            const metadata = await client.store({
                name: name,
                description: description,
                decimals: 0,
                symbol: symbol,
                cvInfo: {
                    name: name,
                    user: user,
                    yearsOfExp: yoe,
                    degree: latestEdu,
                    skills: skills,
                    age: age,
                    contact: contact,
                    linkedInUrl: linkedInUrl
                },
                image: new File(
                    [filesContent[0].content],
                    filesContent[0].name,
                    { type: "image/" + filesContent[0].name.split(".")[1] }
                ),
            });
            console.log(metadata);
            mintNFT({amount, metadata: metadata.url})
            setLoading(false);
            setName("");
            setAmount("0");
            setDescription("");
            setSymbol("");
        })();
    };

    return (
        <>
        <Header />
        <div className='main-landing-page'>
            <form className="ui form error">
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Token Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tez Bytes"
                    />
                </div>
                {name.length > 30 ? (
                    <div className="ui error message">
                        <div className="header">Too long!</div>
                        <p>The name must be less than 30 letters.</p>
                    </div>
                ) : null}
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>About yourself</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe yourself in one line"
                    />
                </div>
                {description.length > 300 ? (
                    <div className="ui error message">
                        <div className="header">Too long!</div>
                        <p>The Description must be less than 300 letters.</p>
                    </div>
                ) : null}
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Symbol</label>
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="TBY"
                    />
                </div>
                {Symbol.length > 10 ? (
                    <div className="ui error message">
                        <div className="header">Too long!</div>
                        <p>The Symbol must be less than 10 letters.</p>
                    </div>
                ) : null}
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>
                        Selling Amount (Mutez) (There is a 3% service fee)
                    </label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                    />
                </div>
                {!/^-?\d+$/.test(amount) && amount !== "" ? (
                    <div className="ui error message">
                        <div className="header">Only number allowed</div>
                        <p>The amount must be a valid Mutez value.</p>
                    </div>
                ) : null}
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Talent Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your name"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Talent Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Type your age"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Contact Number</label>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Type your phone number"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Years of Experience</label>
                    <input
                        type="number"
                        value={yoe}
                        onChange={(e) => setYoe(e.target.value)}
                        placeholder="Type your years of experience"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Skills</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="Type in your skills comma separated"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Latest Degree</label>
                    <input
                        type="text"
                        value={latestEdu}
                        onChange={(e) => setLatestEdu(e.target.value)}
                        placeholder="Undergrad/Postgrad"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>LinkedIn Url</label>
                    <input
                        type="text"
                        value={linkedInUrl}
                        onChange={(e) => setLinkedInUrl(e.target.value)}
                        placeholder="https://www.linkedin.com/in/myself"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Image</label>
                    <button
                        type="button"
                        className="ui basic button"
                        onClick={(event) => {
                            openFileSelector();
                            event.preventDefault();
                        }}
                    >
                        Select files{" "}
                    </button>
                    {filesContent.length > 0 ? filesContent[0].name : ""}
                </div>
                {error ? (
                    <div className="ui error message">
                        <div className="header">Error</div>
                        <p>{error}</p>
                    </div>
                ) : null}

                <button
                    className="ui primary basic button"
                    onClick={(e) => onSubmit(e)}
                    type="submit"
                >
                    Mint
                </button>
            </form>
        </div>
        </>
    );
};