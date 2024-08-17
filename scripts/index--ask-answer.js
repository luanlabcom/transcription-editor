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
        "pinyin": "Tián Zhōng|:|Nǐmen|hǎo.",
        "chinese": "田中|:|你们|好。",
        "english": "Tanaka: Hello",
        "timeRange": [
            5.252967,
            7.561579
        ],
        "type": 0
    },
    {
        "id": 3,
        "pinyin": "Lǐ Míng|:|Lái,|wǒ|gěi|nǐmen|jièshào|——|Dàwèi,|zhè shì|Tián Zhōng|,|tā|shì|wǒ de|péngyǒu,| yě shì|wǒmen|dàxué|de|xuéshēng. |Tián Zhōng,| zhè shì|Dàwèi,| cóng| Yīngguó| lái.",
        "chinese": "李明|:|来|我|给|你们|介绍|——|大卫|这是|田中|，|他|是|我的|朋友，|也是|我们|大学|的|学生。|田中，|这 是|大卫，|从|英国|来。",
        "english": "Li Ming: Come, let me introduce you. David, this is Tanaka. He is my friend and is also a student at our University. Tanaka, this is David from England",
        "timeRange": [
            7.431481,
            21.696636
        ],
        "type": 0
    },
    {
        "id": 4,
        "pinyin": "Dàwèi|:| Nǐ hǎo,| Tián Zhōng|, |hěn| gāoxìng| rènshi| nǐ.",
        "chinese": "大卫|:| 你好，|田中|，|很|高兴|认识|你。",
        "english": "David: Hello Tanaka, it’s very nice to meet you",
        "timeRange": [
            21.696636,
            25.603844
        ],
        "type": 0
    },
    {
        "id": 5,
        "pinyin": "Tián Zhōng|:| Nǐ hǎo,| Dàwèi,| wǒ| yě| hěn| gāoxìng| rènshi| nǐ.| Nǐ| shì| Yīngguó rén| ma?",
        "chinese": "田中|:| 你好，|大卫，|我|也|很|高兴|认识|你。|你|是|英国人|吗?",
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

const Message = React.forwardRef(function (props, ref) {
  // console.log(ref);

  // console.log(props.message);
  //   {
  //     "message": {
  //         "id": 0,
  //         "pinyin": "Dì èr kè|:|Nǐ|shì|nǎ|guórén|?",
  //         "chinese": "第二课|:|你|是|哪|国人|？",
  //         "english": "Lesson Two: What nationality are you?",
  //         "timeRange": [
  //             0,
  //             1.613392
  //         ],
  //         "type": 0
  //     }
  // }
  const [revealTranslation, setRevealTranslation] = React.useState(false);
  const { id, pinyin, chinese, english, timeRange } = props.message;
  const [startTime, endTime] = timeRange;

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

  const message__PCElements_2 = pinyinArr.slice(2).map((pinyin, index) => {
    return (
      <div className="word" key={index}>
        <div className="word--pinyin">{pinyin}</div>
        <div className="word--chinese">{chineseArr[index + 2]}</div>
      </div>
    );
  });

  function handleRevealTranslation(e) {
    e.stopPropagation();
    setRevealTranslation((prev) => !prev);
  }

  return (
    <div
      className="message"
      ref={ref}
      onClick={() => props.handleReplayAudio(startTime, endTime)}
    >
      {pinyinArr.includes(":") ? (
        <div>
          <div className="word--small">
            {pinyinArr[0]} | {chineseArr[0]}:
          </div>
          <div className="flex flex-wrap gap">{message__PCElements_2}</div>
        </div>
      ) : (
        <div className="flex flex-wrap gap">{message__PCElements}</div>
      )}
      <div>
        <button
          className="reveal-translation-btn"
          onClick={handleRevealTranslation}
        >
          {revealTranslation ? "Hide translation" : "Show translation"}
        </button>
        {revealTranslation && <p className="translation">{english}</p>}
      </div>
    </div>
  );
});

function Conversation(props) {
  const [conversation, setConversation] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const endOfConversationRef = React.useRef(null); // Ref for the last message element

  // console.log(currentIndex);
  // console.log("conversation.length", conversation.length);
  React.useEffect(() => {
    // Scroll to the endOfConversationRef element when conversation updates
    if (endOfConversationRef.current) {
      endOfConversationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [conversation]); // Dependency array ensures this runs when conversation updates
  const messageElements = conversation.map((message, index) => {
    // console.log("msgElem", index);
    // Callback ref to attach the ref to the last message element
    const setRef = (node) => {
      if (index === conversation.length - 1) {
        endOfConversationRef.current = node;
      }
    };

    return (
      <Message
        key={message.id}
        message={message}
        ref={setRef} // Use the callback ref
        // ref={(e) => console.log(e)}
        handleReplayAudio={props.handlePlayAudio}
      />
    );
  });

  function handleClick(e) {
    // conversation [1, 2, 3, 4]
    // props.messages [1, 2, 3, 4]
    if (currentIndex >= props.messages.length) return;
    setConversation((prevConversation) => {
      return [...prevConversation, props.messages[currentIndex]];
    });
    props.handlePlayAudio(
      props.messages[currentIndex].timeRange[0],
      props.messages[currentIndex].timeRange[1]
    );
    setCurrentIndex((prev) => prev + 1);

    // Scroll to the endOfConversationRef element
    if (endOfConversationRef.current) {
      endOfConversationRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }

  return (
    <div className="conversation container">
      {messageElements}
      <div>
        {conversation.length <= 0 ? (
          <p>Let's Make Your Language Skills Grow with This Drill Session</p>
        ) : (
          <></>
        )}
      </div>{" "}
      {/* an empty div to push the button to the bottom of the page */}
      {currentIndex < props.messages.length ? (
        <div className="flex justify-center px mt-auto">
          <button className="load-new-message-btn" onClick={handleClick}>
            {conversation.length > 0 ? "Continue" : "Start"}
          </button>
        </div>
      ) : (
        <p>End</p>
      )}
    </div>
  );
}

function AudioPlayer(props) {
  const [endTime, setEndTime] = React.useState(0);
  const audioRef = React.useRef(null);

  function handlePlayAudio(startTime, endTime) {
    audioRef.current.currentTime = startTime;
    setEndTime(endTime);
    audioRef.current.play();
  }

  function handleTimeUpdate() {
    if (audioRef.current.currentTime >= endTime) {
      audioRef.current.pause();
    }
  }
  return (
    <div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}>
        <source src={props.src} type="audio/mp3" />
      </audio>
      <Conversation
        messages={JSON.parse(collection)["Chapter 2.mp3"]}
        handlePlayAudio={handlePlayAudio}
      />
    </div>
  );
}

function App() {
  return (
    <>
      {/* <AudioPlayer audioFile={audioFile} /> */}
      {/* It's not Chapter 2.mp3, but Chapter 2 - Conversation.mp3 */}
      <AudioPlayer src="./Chapter 2.mp3" />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
