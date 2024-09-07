import "../css/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-col">
        <div className="footer-row">
          <div className="footer-container">
            <h3>Categories</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <a href="/electronics">Electronics</a>
              </li>
              <li className="list-group-item">
                <a href="/trousers">Trousers</a>
              </li>
              <li className="list-group-item">
                <a href="/hoodies">Hoodies</a>
              </li>
              <li className="list-group-item">
                <a href="/footwear">Footwear</a>
              </li>
              <li className="list-group-item">
                <a href="/power-tools">Power Tools</a>
              </li>
            </ul>
          </div>
          <div className="footer-container">
            <h3>Most Viewed Items</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <a href="/iphone-15">Iphone 15</a>
              </li>
              <li className="list-group-item">
                <a href="/jump-suit-trouser">Jump Suit Trouser</a>
              </li>
              <li className="list-group-item">
                <a href="/black-cute-anime-girl-hoodie">
                  Black Cute Anime Girl Hoodie
                </a>
              </li>
              <li className="list-group-item">
                <a href="/nike-airforce-1">Nike Airforce 1</a>
              </li>
              <li className="list-group-item">
                <a href="/file-grinder">File Grinder</a>
              </li>
            </ul>
          </div>
          <div className="footer-container">
            <h3>Contact Me</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <a href="mailto:MaalugJonthan11@gmail.com">
                  Email: MaalugJonthan11@gmail.com
                </a>
              </li>
              <li className="list-group-item">
                <a
                  href="https://github.com/Loki-whan12?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github: Lokiwhan12
                </a>
              </li>
              <li className="list-group-item">
                <a
                  href="https://www.linkedin.com/in/maalug-jonathan/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn: Maalug Jonathan
                </a>
              </li>
              <li className="list-group-item">
                <a
                  href="https://x.com/MaalugJ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter: Maalug Jonathan
                </a>
              </li>
              <li className="list-group-item">Phone: 0548990818/0208976257</li>
            </ul>
          </div>
        </div>
        <p>&copy; {currentYear} Store-X. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
