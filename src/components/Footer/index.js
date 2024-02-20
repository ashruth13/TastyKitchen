import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-name">
        <img
          className="footer-img"
          alt="website logo"
          src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/zzntuerghuuht4ugmtac"
        />
        <h1 className="footer-head">Tasty Kitchens</h1>
      </div>
      <p className="footer-p">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="center">
        <div className="footer-end">
          <a href="https://facebook.com">
            <button className="noBtn" type="button">
              <img
                src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/lulvzmut3jejr6yvdcme"
                alt="facebook"
              />
            </button>
          </a>
          <a href="https://instagram.com">
            <button className="noBtn" type="button">
              <img
                alt="instagram"
                src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/feuvnvbaye4sno2bbokw"
              />
            </button>
          </a>
          <a href="https://twitter.com/">
            <button className="noBtn" type="button">
              {' '}
              <img
                alt="twitter"
                src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/yzxa3aiuqdhepizvj6uf"
              />
            </button>
          </a>
          <a href="https://in.pinterest.com/">
            <button className="noBtn" type="button">
              <img
                src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/gv1a00x2nnp5gpp6sdlt"
                alt="pinterest"
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
