const data = `[
    {
        "id": 0,
        "pinyin": "Dì èr kè:|Nǐ|shì|nǎ|guórén?",
        "chinese": "第二课:|你|是|哪|国人？",
        "english": "Lesson Two: What nationality are you?",
        "timeRange": [
            0,
            1.613392
        ],
        "type": 0
    },
    {
        "id": 1,
        "pinyin": "“dīng dōng”|——|mén líng|xiǎng|le.",
        "chinese": "“叮咚”|——|门铃|响|了。",
        "english": "“Ding-dong” - the doorbell rings",
        "timeRange": [
            1.613392,
            5.252967
        ],
        "type": 0
    },
    {
        "id": 2,
        "pinyin": "Tián Zhōng:|Nǐmen|hǎo.",
        "chinese": "田中:|你们|好。",
        "english": "Tanaka: Hello",
        "timeRange": [
            5.252967,
            7.561579
        ],
        "type": 0
    },
    {
        "id": 3,
        "pinyin": "Lǐ Míng:|Lái,|wǒ|gěi|nǐmen|jièshào|——|Dàwèi,|zhè shì|Tián Zhōng,|tā|shì|wǒ de|péngyǒu,| yě shì|wǒmen|dàxué|de|xuéshēng. |Tián Zhōng,| zhè shì|Dàwèi,| cóng| Yīngguó| lái.",
        "chinese": "李明:|来|我|给|你们|介绍|——|大卫|这是|田中，|他|是|我的|朋友，|也是|我们|大学|的|学生。|田中，|这 是|大卫，|从|英国|来。",
        "english": "Li Ming: Come, let me introduce you. David, this is Tanaka. He is my friend and is also a student at our University. Tanaka, this is David from England",
        "timeRange": [
            7.431481,
            21.696636
        ],
        "type": 0
    },
    {
        "id": 4,
        "pinyin": "Dàwèi:| Nǐ hǎo,| Tián Zhōng,| hěn| gāoxìng| rènshi| nǐ.",
        "chinese": "大卫:| 你好，|田中，|很|高兴|认识|你。",
        "english": "David: Hello Tanaka, it’s very nice to meet you",
        "timeRange": [
            21.696636,
            25.603844
        ],
        "type": 0
    },
    {
        "id": 5,
        "pinyin": "Tián Zhōng:| Nǐ hǎo,| Dàwèi,| wǒ| yě| hěn| gāoxìng| rènshi| nǐ.| Nǐ| shì| Yīngguó rén| ma?",
        "chinese": "田中:| 你好，|大卫，|我|也|很|高兴|认识|你。|你|是|英国人|吗?",
        "english": "Tanaka: Hello David, I’m glad to meet you too. Are you English?",
        "timeRange": [
            25.504074,
            31.808575
        ],
        "type": 0
    },
    {
        "id": 6,
        "pinyin": "Dàwèi: Duì, wǒ shì Yīngguó rén. Nǐ shì nǎ guó rén?",
        "chinese": "大卫: 对，我是英国人。你是哪国人？",
        "english": "David: Yes, I’m English. What nationality are you?",
        "timeRange": [
            31.808575,
            36.762728
        ],
        "type": 0
    },
    {
        "id": 7,
        "pinyin": "Tián Zhōng: Wǒ cóng Rìběn lái, shì Rìběn rén. Wǒ zhù zài Běijīng liǎng nián le.",
        "chinese": "田中: 我从日本来，是日本人。我住在北京两年了。",
        "english": "Tanaka: I’m from Japan, I’m Japanese. I’ve lived in Beijing for two years now",
        "timeRange": [
            36.762728,
            43.026992
        ],
        "type": 0
    },
    {
        "id": 8,
        "pinyin": "Lǐ Míng: Dàwèi, jīntiān wǎnshàng, wǒmen sān gè rén yīqǐ chīfàn, hǎo ma?",
        "chinese": "李明: 大卫，今天晚上，我们三个人一起吃饭，好吗？",
        "english": "Li Ming: David, let’s have dinner together tonight, the three of us, yeah?",
        "timeRange": [
            43.026992,
            49.548847
        ],
        "type": 0
    },
    {
        "id": 9,
        "pinyin": "Dàwèi: Hǎo!",
        "chinese": "大卫: 好！",
        "english": "David: Yeah!",
        "timeRange": [
            49.548847,
            50.599184
        ],
        "type": 0
    }
]`

function Lyrics(props) {
    // console.log("Lyrics.props.currentTime", props.lyrics)
    const lyricsRef = React.useRef([])
    function getCurrentLyricIndex() {
        return props.lyrics.findIndex(function(line, index) {
            return props.currentTime >= line.time && 
            (!props.lyrics[index+1] || props.currentTime < props.lyrics[index+1].time)
        })
    }

    const currentIndex = getCurrentLyricIndex()


    // 🔻🔻🔻🔻
    const lineElements = props.lyrics.map((line, index) => {        
        return (
            <button 
                key={ index }
                ref={ p => lyricsRef.current[index] = p } 
                className={currentIndex === index ? "line highlight":"line"}
                onClick={ () => props.onLyricClick(line.time) }
                onTransitionEnd={() => {
                    if (currentIndex === index) {
                        lyricsRef.current[index].scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                        });
                    }
                }}
            >
                { line.text }
            </button>
        )
    })

    // console.log(lyricsRef)
    return(
        <div className="lyrics-container">
            <div id="lyrics">
                { lineElements }
            </div>
        </div>
    )
}

function AudioPlayer() {
    const audioRef = React.useRef(null);
    const [currentTime, setCurrentTime] = React.useState(0);
    const parsedData = JSON.parse(data)
    
    const lyrics = parsedData.map(group => {
        return { time: group.timeRange[0], text: group.pinyin  }
    })

    // const lyrics = [
    //     { time: 0, text: "First line of lyrics" },
    //     { time: 5, text: "Second line of lyrics" },
    //     { time: 10, text: "Third line of lyrics" },
    //     { time: 15, text: "First line of lyrics" },
    //     { time: 20, text: "Second line of lyrics" },
    //     { time: 25, text: "Third line of lyrics" },
    //     { time: 30, text: "First line of lyrics" },
    //     { time: 35, text: "Second line of lyrics" },
    //     { time: 40, text: "Third line of lyrics" },
    //     { time: 45, text: "First line of lyrics" },
    //     { time: 50, text: "Second line of lyrics" },
    //     // Add more lines as needed
    // ];

    function handleTimeUpdate() {
        setCurrentTime(audioRef.current.currentTime);
    };

    // console.log("currentTime state", currentTime)

    function handleLyricClick (time) {
        audioRef.current.currentTime = time
        audioRef.current.play()
    }

    return(
        <div className="player-container">
            <audio ref={audioRef} controls  onTimeUpdate={handleTimeUpdate}>
                <source src="c-02.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>      
            <Lyrics lyrics={lyrics} currentTime={currentTime} onLyricClick={ handleLyricClick } />      
        </div>
    )
}

function App() {
    return (
        <>
            <AudioPlayer  />
        </>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)