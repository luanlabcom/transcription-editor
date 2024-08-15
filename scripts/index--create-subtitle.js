function AudioPlayer() {
    const audioRef = React.useRef()
    const fileUploadRef = React.useRef(null)

    const [audioFile, setAudioFile] = React.useState("https://essentials.pixfort.com/original/wp-content/uploads/sites/4/2020/02/skanews.wav")
    
    function playAudio() {
        console.log(audioRef.current)
        audioRef.current.play()
    }

    function handleTimeUpdate() {
        console.log(audioRef.current.currentTime)
    }

    function handleChange() {
        const files = fileUploadRef.current.files
        setAudioFile(URL.createObjectURL(files[0]))
    }

    return (
        <div>
            <input ref={ fileUploadRef } type="file" accept="audio/*" onChange={ handleChange } />
            <audio ref={ audioRef } src={ audioFile } onTimeUpdate={ handleTimeUpdate } controls></audio>
            <button onClick={ playAudio }>Play audio</button>
        </div>
    )
}

function App() {
    return(
        <>
            <h1>Hello world</h1>
            <AudioPlayer />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)