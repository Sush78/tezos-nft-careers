import {React, useState, useEffect} from 'react'
import { useFilePicker } from "use-file-picker";
import { NFTStorage, File } from "nft.storage/dist/bundle.esm.min.js";
import { apiKey } from '../creds/creds';
import { mintNFT } from '../utils/opertions';
import { Header } from './Header';
import { LINKEDIN_URL, LINKEDIN_STATE } from '../constants/constans';
import { Button, Icon } from 'semantic-ui-react'

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
    const [amount, setAmount] = useState("1");
    const [error, setError] = useState("");
    const [loadingSubmit, setLoading] = useState(false);
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [popup, setPopup] = useState(null)
    const [receiveProviderToken, setReceiveProviderToken] = useState(null)

    const signInWithLinkedin = () => {
        setPopup(window.open(LINKEDIN_URL, '_blank', 'width=600,height=600'))
        window.addEventListener('message', receiveLinkedInMessage)
    }

    const receiveLinkedInMessage = ({ origin, data: { state, code, error, ...rest} }) => {
        if (origin !== window.location.origin || state !== LINKEDIN_STATE) return
        if (code) {
            setReceiveProviderToken({ provider: "LinkedIn", token: code })
            console.log(code)
        } else if (error && !['user_cancelled_login', 'user_cancelled_authorize'].includes(error)) {
            setReceiveProviderToken({ provider: "LinkedIn", error: { error, ...rest} })
        }
        popup.close()
      }

    useEffect(() => {
        window.removeEventListener('message', receiveLinkedInMessage)
        popup && popup.close()
    }, [])

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
                user: "talent",
                cvInfo: {
                    name: name,
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
                    <label>LinkedIn Profile URL</label>
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
                    <label>Profile Picture</label>
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
                <div className='ant-input'>
                    <Button color='linkedin' onClick={() =>
                            signInWithLinkedin()
                        }>
                        <Icon name='linkedin' /> Sign In with LiknedIn
                    </Button>
                </div>
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