const collection = `{
  "chapter-2-qa" : [
  {
    "id": 0,
    "timeline": [
      0,
      3.459
    ],
    "ipa": "Dì|èr|kè|:|tīng|hé|huídá",
    "targetLang": "第|二|课|:|听|和|回答",
    "translationLang": "Lesson 2: Listen and Answer",
    "img": "img",
    "type": "paragraph"
  },
  {
    "id": 1,
    "timeline": [
      3.459,
      6.154
    ],
    "ipa": "“Dīng dōng”| — |Ménlíng|xiǎngle|.",
    "targetLang": "“叮咚”| — |门铃|响了|。",
    "translationLang": "“Ding dong” — The doorbell rang.",
    "img": "img",
    "type": "paragraph"
  },
  {
    "id": 2,
    "timeline": [
      6.154,
      8.204
    ],
    "ipa": "Ménlíng|xiǎngle|ma|?",
    "targetLang": "门铃|响了|吗|？",
    "translationLang": "Did the doorbell ring?",
    "img": "img",
    "type": "question"
  },
  {
    "id": 3,
    "timeline": [
      8.204,
      10.874
    ],
    "ipa": "Duì|,|ménlíng|xiǎngle|.",
    "targetLang": "对|，|门铃|响了|。",
    "translationLang": "Yes, the doorbell rang.",
    "img": "img",
    "type": "answer"
  },
  {
    "id": 4,
    "timeline": [
      10.874,
      14.350999999999999
    ],
    "ipa": "Ménlíng|xiǎngle|háishì|diànhuà|xiǎngle|?",
    "targetLang": "门铃|响了|还是|电话|响了|？",
    "translationLang": "Did the doorbell ring or did the telephone ring?",
    "img": "img",
    "type": "question"
  },
  {
    "id": 5,
    "timeline": [
      14.350999999999999,
      16.21
    ],
    "ipa": "Ménlíng|xiǎngle|.",
    "targetLang": "门铃|响了|。",
    "translationLang": "The doorbell rang.",
    "img": "img",
    "type": "answer"
  },
  {
    "id": 6,
    "timeline": [
      16.21,
      18.238
    ],
    "ipa": "Shénme|xiǎngle|?",
    "targetLang": "什么|响了|？",
    "translationLang": "What rang?",
    "img": "img",
    "type": "question"
  },
  {
    "id": 7,
    "timeline": [
      18.238,
      20.249
    ],
    "ipa": "Ménlíng|xiǎngle|.",
    "targetLang": "门铃|响了|。",
    "translationLang": "The doorbell rang.",
    "img": "img",
    "type": "answer"
  },
  {
    "id": 8,
    "timeline": [
      20.249,
      22.299
    ],
    "ipa": "Ménlíng|huàile|ma|?",
    "targetLang": "门铃|坏了|吗|？",
    "translationLang": "Was the doorbell broken?",
    "img": "img",
    "type": "question"
  },
  {
    "id": 9,
    "timeline": [
      22.299,
      27.043
    ],
    "ipa": "Bù|,|ménlíng|méi|huài|.|Ménlíng|xiǎngle|!",
    "targetLang": "不|，|门铃|没|坏|。|门铃|响了|！",
    "translationLang": "No, the doorbell wasn’t broken. The doorbell rang!",
    "img": "img",
    "type": "answer"
  },
  {
    "id": 10,
    "timeline": [
      27.043,
      29.083
    ],
    "ipa": "Shéi|ànle|ménlíng|?",
    "targetLang": "谁|按了|门铃|？",
    "translationLang": "Who rang the doorbell?",
    "img": "img",
    "type": "question"
  },
  {
    "id": 11,
    "timeline": [
      29.083,
      31.3
    ],
    "ipa": "Shì|Tián Zhōng|àn|de|.",
    "targetLang": "是|田中|按|的|。",
    "translationLang": "It was Tanaka who rang the doorbell.",
    "img": "img",
    "type": "answer"
  },
  {
    "id": 12,
    "timeline": [
      31.3,
      33.923
    ],
    "ipa": "Ménlíng|wèishéme|xiǎngle|?",
    "targetLang": "门铃|为什么|响了|？",
    "translationLang": "Why did the doorbell ring?",
    "img": "img",
    "type": "question"
  },
  {
    "id": 13,
    "timeline": [
      33.923,
      36.696
    ],
    "ipa": "Yīnwèi|Tián Zhōng|ànle|ménlíng|.",
    "targetLang": "因为|田中|按了|门铃|。",
    "translationLang": "Because Tanaka rang the doorbell.",
    "img": "img",
    "type": "answer"
  }
]
}`;
const Message = React.forwardRef(function (props, ref) {
  const [revealTranslation, setRevealTranslation] = React.useState(false);
  const { id, ipa, targetLang, translationLang, timeline } = props.message;
  const [startTime, endTime] = timeline;

  const ipaArr = ipa.split("|");
  const targetLangArr = targetLang.split("|");

  const message__PCElements = ipaArr.map((ipa, index) => {
    return (
      <div className="word" key={index}>
        <div className="word--pinyin">{ipa}</div>
        <div className="word--chinese">{targetLangArr[index]}</div>
      </div>
    );
  });

  // const message__PCElements_2 = ipaArr.slice(2).map((ipa, index) => {
  //   return (
  //     <div className="word" key={index}>
  //       <div className="word--pinyin">{ipa}</div>
  //       <div className="word--chinese">{targetLangArr[index + 2]}</div>
  //     </div>
  //   );
  // });

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
      {/* {ipaArr.includes(":") ? (
        <div>
          <div className="word--small">
            {ipaArr[0]} | {targetLangArr[0]}:
          </div>
          <div className="flex flex-wrap gap">{message__PCElements_2}</div>
        </div>
      ) : ( */}
      <div className="flex flex-wrap gap">{message__PCElements}</div>
      {/* )} */}
      <div>
        <button
          className="reveal-translation-btn"
          onClick={handleRevealTranslation}
        >
          {revealTranslation ? "Hide translation" : "Show translation"}
        </button>
        {revealTranslation && <p className="translation">{translationLang}</p>}
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
      props.messages[currentIndex].timeline[0],
      props.messages[currentIndex].timeline[1]
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
    audioRef.current.playbackRate = 0.75;
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
        messages={JSON.parse(collection)["chapter-2-qa"]}
        handlePlayAudio={handlePlayAudio}
      />
    </div>
  );
}

function App() {
  // console.log(JSON.parse(collection)["Chapter 2.mp3"]);
  return (
    <>
      {/* <AudioPlayer audioFile={audioFile} /> */}
      {/* It's not Chapter 2.mp3, but Chapter 2 - Conversation.mp3 */}
      <AudioPlayer src="./chapter-2-qa.mp3" />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
