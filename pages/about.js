import Test from "../component/test.js";

const data = {
  "id": 26,
  "chain": {
    "name": "poliwag",
    "pic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/60.svg",
    "next": [
      {
        "name": "poliwhirl",
        "pic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/61.svg",
        "next": [
          {
            "name": "poliwrath",
            "pic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/62.svg",
            "next": null
          },
          {
            "name": "politoed",
            "pic": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/186.svg",
            "next": null
          }
        ]
      }
    ]
  }
}

const About = () => {
  return (
    <div>
      <div class="tf-tree example">
        <ul>
          <li>
            <span class="tf-nc">1</span>
            <ul>
              <li>
                <span class="tf-nc">2</span>
                <ul>
                  <li><span class="tf-nc">4</span></li>
                  <li><span class="tf-nc">6</span></li>
                </ul>
              </li>
              <li>
                <span class="tf-nc">3</span>
                <ul>
                  <li><span class="tf-nc">7</span></li>
                  <li><span class="tf-nc">8</span></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default About;
