const data = `[
    {
        "id": 0,
        "pinyin": "Dì èr kè|:|Nǐ|shì|nǎ|guórén|?",
        "chinese": "第二课|:|你|是|哪|国人|？",
        "english": "Lesson Two: What nationality are you?",
        "timeRange": [
            0,
            1.613392
        ],
        "type": 0
    },
    {
        "id": 1,
        "pinyin": "“dīng dōng”|—|mén líng|xiǎng|le.",
        "chinese": "“叮咚”|—|门铃|响|了。",
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

function AudioPlayer() {
    return (
        <div>
            <audio controls src={"./c-02.mp3"}></audio>
        </div>
    )
}

function MessageGroup(props) {
    const { pinyin, chinese, english, timeRange, type, id } = props.messageGroup
    
    const pinyinArray = pinyin.split("|")
    const chineseArray = chinese.split("|")

    
    const groupWordsElements = pinyinArray.map((pinyin, index) => {
        return (
            <div key={ index } className="group">
                <div className="word word--pinyin" style={ index%2 ? {color: "hsla(90, 100%, 25%, 1)"} : {} }>{ pinyin }</div>
                <div className="word word--chinese" style={ index%2 ? {color: "hsla(90, 100%, 25%, 1)"} : {} }>{ chineseArray[index] }</div>
            </div>
        )
    })
    return (
        <div className="text-message">
            <div className="container">
                <div className="flex gap flex-wrap">
                    { groupWordsElements }
                </div>
                <div className="translation translation--show">{ english }</div>
            </div>
        </div>
    )
}

function Convo(props) {
    const messageGroupElements = props.convoArray.map(messageGroup => {
        return <MessageGroup key={ messageGroup.id } messageGroup={ messageGroup } />
    })

    return (
        <div className="convo">
            { messageGroupElements }
        </div>
    )
}

function App() {
    const convoArray = JSON.parse(data)
    // console.log("convoArray 👉", convoArray)
    return (
        <>
            <AudioPlayer />
            <Convo convoArray={ convoArray } />
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)