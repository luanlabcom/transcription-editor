function Preview(props) {
  // function handleChange() {
  //   // console.log("handleChange");
  // }

  function parseText(text) {
    if (!text) return JSON.stringify({});

    const result = [];

    let blocks = text.trim().split("\n\n");

    blocks.forEach((block, index) => {
      const lines = block.trim().split("\n");

      // extract id
      const id = Number(lines[0].trim());

      // extract timeline
      const timeline = lines[1].trim().split(" -> ");
      const [start, end] = timeline;
      const startTime = start.replace(/[\[\]]/g, "");
      const endTime = end.replace(/[\[\]]/g, "");

      // convert string timeline '00:25.517' to seconds
      function timeToSeconds(timeInString) {
        const [minutes, seconds] = timeInString.split(":");

        const [sec, millis] = seconds.split(".");

        return Number(
          parseInt(minutes) * 60 + parseInt(sec) + parseFloat(millis) / 1000
        );
      }

      // extract ipa, target_lang, translation_lang,
      const ipa = lines[2].trim();
      const targetLang = lines[3].trim();
      const translationLang = lines[4].trim();

      // extract img, and metadata
      const img = lines[5].trim().split("--");
      let imgSrc, imgAlt;
      if (img.length > 1) {
        [imgSrc, imgAlt] = img;
      } else {
        [imgSrc, imgAlt] = ["", ""];
      }

      const info = lines[6].trim().split("--");
      const [type, avatarImg, targetLangName, ipaName, bg, text] = info;

      if (type === "dialogue") {
        result.push({
          id: id,
          type: type,
          speakerInfo: {
            avatar: avatarImg,
            ipaName: ipaName,
            targetLangName: targetLangName,
          },
          timeline: [timeToSeconds(startTime), timeToSeconds(endTime)],
          text: {
            ipaText: ipa,
            targetLangText: targetLang,
            translationText: translationLang,
          },
          img: {
            src: imgSrc,
            alt: imgAlt,
          },
          colors: [bg, text],
        });
      } else {
        result.push({
          id: id,
          type: type,
          speakerInfo: null,
          timeline: [timeToSeconds(startTime), timeToSeconds(endTime)],
          text: {
            ipaText: ipa,
            targetLangText: targetLang,
            translationText: translationLang,
          },
          img: {
            src: imgSrc,
            alt: imgAlt,
          },
          colors: null,
        });
      }
    });

    return JSON.stringify(result, null, 4);
  }

  React.useEffect(
    function () {
      // function textToObject(){}
      localStorage.setItem(
        props.fileName.replace(/\.mp3/g, ""),
        parseText(props.output)
      );
    },
    [props.output]
  );
  return (
    <>
      <textarea
        className="preview"
        name="preview"
        value={parseText(props.output)}
        // onChange={handleChange}
        disabled
      />
    </>
  );
}

function TextEditor(props) {
  //   console.log("texteditor", props.formData.textEditor);

  return (
    <div>
      <textarea
        className="text-editor"
        name="textEditorContent"
        value={props.formData.textEditorContent}
        onChange={props.handleChange}
      />
    </div>
  );
}

function AudioPlayer(props) {
  const audioRef = React.useRef(null);
  const timelineInputRef = React.useRef(null);

  function handleUploadFile(e) {
    const files = e.target.files;
    audioRef.current.src = URL.createObjectURL(files[0]);
    props.handleLoadText(files[0].name);
  }

  function secondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const milliseconds = Math.round((secs - Math.floor(secs)) * 1000);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(Math.floor(secs)).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(3, "0");

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  }

  function getCurrentTime(e) {
    // props.updateTimelineInput(secondsToTime(audioRef.current.currentTime));
    timelineInputRef.current.value = secondsToTime(e.target.currentTime);
  }

  function copyTimeline() {
    timelineInputRef.current.select();
    document.execCommand("copy");
  }

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleUploadFile} />
      <audio
        ref={audioRef}
        controls
        onTimeUpdate={getCurrentTime}
        onPause={copyTimeline}
        onCanPlayThrough={(e) => getCurrentTime(e)}
      ></audio>
      <div>
        <input
          className="timeline-input"
          ref={timelineInputRef}
          type="text"
          name="timelineInput"
          // disabled
        />
      </div>
    </div>
  );
}

function App() {
  const [formData, setFormData] = React.useState({ textEditorContent: `` });
  const [fileName, setFileName] = React.useState("");
  const [revealPreview, setRevealPreview] = React.useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleLoadText(fileName) {
    setFileName(fileName);

    setFormData(
      JSON.parse(localStorage.getItem(fileName, "")) || {
        textEditorContent: ``,
      }
    );
  }
  console.log(localStorage.getItem(fileName.replace(/\.mp3/g, "")));
  React.useEffect(
    function () {
      localStorage.setItem(fileName, JSON.stringify(formData));
      setRevealPreview(false);
    },
    [formData]
  );
  return (
    <>
      <div style={{ marginTop: "4em" }}>
        <AudioPlayer handleLoadText={handleLoadText} />
      </div>
      <div className="form">
        <TextEditor formData={formData} handleChange={handleChange} />
        <button onClick={() => setRevealPreview((prev) => !prev)}>
          Parse Text
        </button>
        <div>
          {revealPreview && (
            <Preview output={formData.textEditorContent} fileName={fileName} />
          )}
        </div>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
