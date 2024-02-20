import { useRef, useState } from "react";

interface Position {
  top: number;
  left: number;
}

const Home = () => {
  const [position, setPosition] = useState<Position>({ top: 50, left: 50 });
  const [isButtonAbsolute, setIsButtonAbsolute] = useState<boolean>(false);
  const [isBadButtonClick, setIsBadButtonClick] = useState<boolean>(false);
  const [badButtonColor, setBadButtonColor] = useState<string>("");
  const [escapeCounter, setEscaperCounter] = useState(0);
  const [showLove, setShowLove] = useState<boolean>(false);
  const hoverTimeout = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const badButtonRef = useRef<HTMLButtonElement | null>(null);
  // Retrieve button texts from localStorage or use default values
  const [badButtonText, setBadButtonText] = useState<string>(
    localStorage.getItem("seeminglyBadOption") || "Bad Option" // Adjusted to use localStorage
  );
  const [goodButtonText] = useState<string>(
    localStorage.getItem("attractiveOption") || "Good Option" // Example for good option button
  );

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }

    hoverTimeout.current = setTimeout(() => {
      if (buttonRef.current) {
        const buttonWidth = buttonRef.current.offsetWidth;
        const buttonHeight = buttonRef.current.offsetHeight;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const maxWidth = viewportWidth - buttonWidth;
        const maxHeight = viewportHeight - buttonHeight;

        // Define a minimum distance the button should move
        const minDistance = 300; // Adjust this value as needed

        let newLeft: number, newTop: number;
        let attempts = 0;
        do {
          newLeft = Math.random() * maxWidth;
          newTop = Math.random() * maxHeight;

          const currentPos = isButtonAbsolute
            ? {
                top: buttonRef.current.offsetTop,
                left: buttonRef.current.offsetLeft,
              }
            : buttonRef.current.getBoundingClientRect();

          // Calculate the distance between the new position and the current position
          const distance = Math.sqrt(
            Math.pow(newTop - currentPos.top, 2) +
              Math.pow(newLeft - currentPos.left, 2)
          );

          // If the distance is greater than the minimum distance, or after a certain number of attempts, accept the position
          if (distance > minDistance || attempts > 10) {
            break;
          }

          attempts++;
        } while (true);

        if (!isButtonAbsolute) {
          setPosition({
            top: buttonRef.current.getBoundingClientRect().top,
            left: buttonRef.current.getBoundingClientRect().left,
          });
          setTimeout(() => {
            setPosition({ top: newTop, left: newLeft });
          }, 100);
        } else {
          setPosition({ top: newTop, left: newLeft });
        }
        setEscaperCounter((prevCounter: number) => prevCounter + 1);
        setIsButtonAbsolute(true);
      }
    }); // Adjust the timeout as needed
  };
  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  };

  const handleClickGoodOption = () => {
    setIsButtonAbsolute(true);

    handleMouseEnter();
    setTimeout(() => {
      handleMouseLeave();
    }, 200);
  };

  const handleClickBadOption = () => {
    if (isBadButtonClick) {
      return;
    }

    setIsBadButtonClick(true);
    setShowLove(true); // Trigger the love/heart animation
    setBadButtonColor("pink");
    setTimeout(() => {
      setBadButtonText(localStorage.getItem("realDeal") || "Real Deal"); // Change text after a delay
      setShowLove(false); // Optionally hide the hearts again
    }, 2000); // Adjust time as needed
  };

  return (
    <div className="App">
      <div className="titleContainer">
        <h2 className="title">Choose Your Valentine's Present</h2>
        <img src="/valentine-game/roses.svg" width={"50px"}></img>
      </div>
      <div className="cover-image">
        <iframe
          src={
            isBadButtonClick
              ? "https://giphy.com/embed/6oEc940xVQMM6ikt2A"
              : "https://giphy.com/embed/xT0GqFhyNd0Wmfo6sM"
          }
          width="350"
          height="350"
          allowFullScreen
        ></iframe>
        <div className="transparent-div"></div>
      </div>

      <div className="buttons">
        <div className="relative-container buttons">
          {escapeCounter > 10 && !isBadButtonClick && false && (
            <div className="positioned-div">
              <img src="/public/arrow.svg" width={"50px"}></img>
              <p className="actionText">Click Me !</p>
            </div>
          )}
          <button
            ref={badButtonRef}
            className={`button bad ${showLove ? "show-love" : ""} ${
              badButtonColor === "pink" ? "pink" : ""
            }`}
            onClick={handleClickBadOption}
          >
            <p className={`${showLove ? "show-love" : ""}`}>{badButtonText}</p>
          </button>
        </div>
        {showLove && <div className="hearts"></div>}
        {!isBadButtonClick && (
          <button
            ref={buttonRef}
            className={`button good`}
            style={{
              position: isButtonAbsolute ? "absolute" : "static", // Use isButtonAbsolute to toggle position
              top: isButtonAbsolute ? `${position.top}px` : undefined, // Apply top only if absolute
              left: isButtonAbsolute ? `${position.left}px` : undefined, // Apply left only if absolute
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickGoodOption}
          >
            {goodButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
