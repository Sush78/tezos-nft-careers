import {React, useState} from 'react'
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage/dist/bundle.esm.min.js";
import { apiKey } from '../creds/creds';
import { mintNFT } from '../utils/opertions';
import { Header } from './Header';

const client = new NFTStorage({ token: apiKey });

export const CreateJobDesc = () => {
    const [openFileSelector, { filesContent }] = useFilePicker({
        accept: [".png", ".jpg", ".jpeg"],
        multiple: false,
        readAs: "ArrayBuffer",
    });
    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [contact, setContact] = useState("");
    const [jobDesc, setJobDesc] = useState("");    // years of experience
    const [role, setRole] = useState("");
    const [skills, setSkills] = useState("");
    const [symbol, setSymbol] = useState("");
    const [amount, setAmount] = useState("0");
    const [error, setError] = useState("");
    const [loadingSubmit, setLoading] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            name === "" ||
            jobDesc === "" ||
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
                description: jobDesc,
                decimals: 0,
                symbol: symbol,
                user: "company",
                jobInfo: {
                    name: name,
                    skills: skills,
                    role: role,
                    salary: salary,
                    contact: contact
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
            setSymbol("");
        })();
    };

    return (
        <>
        <Header />
        <div className='main-landing-page'>
            <form className="ui form error">
                <div className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}>
                    <label>Company name</label>
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
                    <label>Role</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Type in your job role"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Job Description</label>
                    <textarea
                        type="text"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Type your Job Description"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Skills required</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="skillA,skillB..."
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Salary Range</label>
                    <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Type your annual salary range"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Contact Email</label>
                    <input
                        type="email"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Type your contact email"
                    />
                </div>
                <div
                    className={`field required ${
                        loadingSubmit ? "disabled" : ""
                    }`}
                >
                    <label>Job Poster</label>
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
                    className={`ui button ${loadingSubmit ? "loading" : ""}`}
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