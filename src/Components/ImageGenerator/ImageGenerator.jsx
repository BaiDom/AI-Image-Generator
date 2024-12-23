import React, { useRef, useState } from "react";
import "./ImageGenerator.css";
import defaultImg from "../Assets/default_image.svg";
import OpenAI from "openai";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
    dangerouslyAllowBrowser: true,
  });

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${inputRef.current.value}`,
      n: 1,
      size: "1024x1024",
    });
    setImage_url(response.data[0].url);
    setLoading(false);
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
      </div>
      <div className="sub-header">Powered by OpenAI Dall-E 3</div>
      <div className="image-search-container">
        <div className="img-loading">
          <div className="image">
            <img src={image_url === "/" ? defaultImg : image_url} />
          </div>
          <div className="loading">
            <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
            <div className={loading ? "loading-text" : "display-none"}>
              Loading... (Generating the image may take a few seconds)
            </div>
          </div>
        </div>
        <div className="search-box">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="Describe What You Want To See"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                imageGenerator();
              }
            }}
          />
          <div
            className="generate-btn"
            onClick={() => {
              imageGenerator();
            }}
          >
            Generate
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
