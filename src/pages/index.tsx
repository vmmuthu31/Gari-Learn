import Header from "./components/Header";
import chingariLivepeer from "chingari-livepeer"

export default function Home() {
  return (
    <main className="background-container">
      <Header />
      <div>
      <section className="section px-20 pt-10 w-full" aria-label="hero" data-section>
        <div className="flex gap-20">

          <div className="hero-content md:mt-20">

            <h1 className=" text-5xl font-bold">Educate the future generation with web3</h1>

            <p className="text-lg mt-3  ">
            Get an NFt on successful completion of each courses
            </p>

            <button className="px-6 rounded-xl  text-black text-lg bg-yellow-400 py-3 mt-5 font-bold">Get started</button>

          </div>

          <figure className="overflow-hidden">
            <img src="https://media3.giphy.com/media/zyC5cbSfopxNHIacnr/giphy.gif?cid=ecf05e47x9ow6d54jymb9nxx7fd9oy2i7mqn27xq3cty6pux&rid=giphy.gif&ct=g"  alt="hero banner" className=" w-[750px] h-[350px] inline-block animate-pulse-once  " />
          </figure>

        </div>
      </section>
      </div>
    </main>
  )
}
