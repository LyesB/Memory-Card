import { useState, useEffect } from "react"

const Card = () => {
  const [gifs, setGifs] = useState()
  const [fetching, setFetching] = useState(true)
  const [initialRender, setInitialRender] = useState(true)
  const [shuffledGifsArray, setShuffledGifsArray] = useState([])
  const [clickedIds, setClickedIds] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
  }, [score])

  useEffect(() => {
    fetch(
      "https://api.giphy.com/v1/gifs?ids=17Q92poP1qJwI,H4DjXQXamtTiIuCcRU,1ViLp0GBYhTcA,QX9l4AEoMBwM4nRRQj,cwVpJ20TvKBDYxphSn,RvD4xyr0k2K5IrMu6i,2x0VePimPaFJDpGZ7H,YRtLgsajXrz1FNJ6oy,mv0YspNUxxhggiGp3U,JmOCsOsWwgO7hcAZNZ,l1J9z8L6E739HI4Hm,JrSLWbqkTgGSRyJ5cS&api_key=5pBGPRzD4MliVf7fkVrSlYpprtoBtrgq"
    )
      .then((res) => {
        return res.json()
      })
      .then((gif) => {
        setGifs(gif.data)
        setFetching(false)
      })
  }, [])

  if (fetching) {
    return <div>Loading..</div>
  }

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5)
  const gifsArray = gifs

  const handleClick = () => {
    setInitialRender(false)

    setShuffledGifsArray(shuffleArray(gifsArray))
  }

  function renderGifs(array) {
    const data = array.map((gif) => (
      <div key={gif.id} onClick={handleClick}>
        <button
          className="max-w-64 max-h-fit border-4 border-[#F6C794] rounded-lg"
          key={gif.id}
          onClick={() => {
            if (clickedIds.includes(gif.id)) {
              setScore(0)
              setClickedIds([])
            } else {
              setClickedIds([...clickedIds, gif.id])
              setScore(score + 1)
            }
          }}
        >
          <img src={gif.images.downsized.url} alt={gif.title} key={gif.id} />
        </button>
      </div>
    ))

    return data
  }

  return (
    <>
      <div className="justify-self-center">
        <div className="font-bold text-xl font-mono ">Score: {score}</div>
        <div className="font-bold text-xl font-mono ">
          Best Score: {bestScore}
        </div>
      </div>

      <div className="grid grid-rows-2 grid-cols-6 gap-2 mb-20">
        {initialRender ? renderGifs(gifs) : renderGifs(shuffledGifsArray)}
      </div>
    </>
  )
}

export default Card
