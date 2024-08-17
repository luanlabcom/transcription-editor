const collection = `{
    "Chapter 2.mp3": [
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
        "pinyin": "“dīng dōng”|—|mén líng|xiǎng|le|.",
        "chinese": "“叮咚”|—|门铃|响|了|。",
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
        "pinyin": "Dàwèi|:|Duì|,|wǒ|shì|Yīngguó|rén|.|Nǐ|shì|nǎ|guó|rén|?",
        "chinese": "大卫|:|对|，|我|是|英国|人|。|你|是|哪|国|人|？",
        "english": "David: Yes, I’m English. What nationality are you?",
        "timeRange": [
            31.808575,
            36.762728
        ],
        "type": 0
    },
    {
        "id": 7,
        "pinyin": "Tián Zhōng|:|Wǒ|cóng|Rìběn|lái|,|shì|Rìběn|rén|.|Wǒ|zhù|zài|Běijīng|liǎng|nián|le|.",
        "chinese": "田中|:|我|从|日本|来|，|是|日本|人|。|我|住|在|北京|两|年|了|。",
        "english": "Tanaka: I’m from Japan, I’m Japanese. I’ve lived in Beijing for two years now",
        "timeRange": [
            36.762728,
            43.026992
        ],
        "type": 0
    },
    {
        "id": 8,
        "pinyin": "Lǐ Míng|:|Dàwèi|,|jīntiān|wǎnshàng|,|wǒmen|sān|gè|rén|yīqǐ|chīfàn|,|hǎo|ma|?",
        "chinese": "李明|:|大卫|，|今天|晚上|，|我们|三|个|人|一起|吃饭|，|好|吗|？",
        "english": "Li Ming: David, let’s have dinner together tonight, the three of us, yeah?",
        "timeRange": [
            43.026992,
            49.548847
        ],
        "type": 0
    },
    {
        "id": 9,
        "pinyin": "Dàwèi|:|Hǎo|!",
        "chinese": "大卫|:|好|！",
        "english": "David: Yeah!",
        "timeRange": [
            49.548847,
            50.599184
        ],
        "type": 0
    }
]}`;

function AudioPlayer(props) {
  const [audioFile, setAudioFile] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  //   const fileUploadRef = React.useRef(null);
  const audioRef = React.useRef(null);
  const [lessonData, setLessonData] = React.useState([]);

  // console.log("Audio props showTranslation", props.showTranslation)

  function handleChange(e) {
    const files = e.target.files;
    // const { lastModified, name, size, type } = files[0];
    // console.log(`${lastModified}${name}${size}${type}`);
    setLessonData(JSON.parse(collection)[files[0].name] || []);
    setAudioFile(URL.createObjectURL(files[0]));
  }

  function handleTimeUpdate(e) {
    const currentTimeUpdated = e.target.currentTime;
    // setCurrentTime(audioRef.current.currentTime);
    setCurrentTime(currentTimeUpdated);
  }

  function playAudio(startTime) {
    audioRef.current.currentTime = startTime;
    audioRef.current.play();
  }

  return (
    <div>
      <input
        // ref={fileUploadRef}
        type="file"
        accept="audio/*"
        onChange={handleChange}
      />
      <audio
        ref={audioRef}
        src={audioFile}
        onTimeUpdate={handleTimeUpdate}
        controls
      ></audio>
      <Messages
        messages={lessonData}
        currentTime={currentTime}
        showTranslation={props.showTranslation}
        onPlayAudio={playAudio}
      />
    </div>
  );
}

const Message = React.forwardRef((props, ref) => {
  const { pinyin, chinese, english, timeRange } = props.message;
  const [startTime] = timeRange;
  const pinyinArr = pinyin.split("|");
  const chineseArr = chinese.split("|");

  const message__PCElements = pinyinArr.map((pinyin, index) => {
    return (
      <div className="word" key={index}>
        <div className="word--pinyin">{pinyin}</div>
        <div className="word--chinese">{chineseArr[index]}</div>
      </div>
    );
  });

  return (
    <div
      className={props.classList}
      ref={ref}
      onClick={() => props.onPlayAudio(startTime)}
    >
      <div className="flex flex-wrap gap">{message__PCElements}</div>
      {props.showTranslation && <p className="translation">{english}</p>}
    </div>
  );
});

function Messages(props) {
  // console.log(props.messages)
  // console.log(props.showTranslation)
  const messagesRef = React.useRef([]);
  // console.log(props.currentTime)

  function getCurrentMessageIndex() {
    return props.messages.findIndex(function (line, index) {
      return (
        props.currentTime >= line.timeRange[0] &&
        (!props.messages[index + 1] ||
          props.currentTime < props.messages[index + 1].timeRange[0])
      );
    });
  }

  const currentIndex = getCurrentMessageIndex();

  React.useEffect(() => {
    if (messagesRef.current[currentIndex]) {
      messagesRef.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentIndex]);

  const messageElements = props.messages.map((message, index) => {
    return (
      <Message
        key={message.id}
        ref={(msgEl) => (messagesRef.current[index] = msgEl)}
        message={message}
        classList={currentIndex === index ? "message highlight" : "message"}
        showTranslation={props.showTranslation}
        onPlayAudio={props.onPlayAudio}
      />
    );
  });
  return <div className="messages">{messageElements}</div>;
}

function App() {
  const [showTranslation, setShowTranslation] = React.useState(false);

  function handleShowTranslation() {
    setShowTranslation((prevState) => !prevState);
  }

  return (
    <>
      <AudioPlayer showTranslation={showTranslation} />
      <button onClick={handleShowTranslation}>Show translations</button>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
