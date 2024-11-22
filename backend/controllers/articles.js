
const axios= require('axios')
const cheerio = require('cheerio')

//handler function to handle search bar request
const handleArticles = async (req, res) => {
    try {
      const query = req.body.data.q
      const response = await axios.get(`https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`);
  
      if (response.status === 200) {
        const $ = cheerio.load(response.data);
        const articles = [];
        $('.gs_ri').each((_, element) => {
          const title = $(element).find('.gs_rt a').text();
          const author = $(element).find('.gs_a').text();
          const snippet = $(element).find('.gs_rs').text();
          const articleLink = $(element).find('.gs_rt a').attr('href');
          articles.push({ title, author, snippet, articleLink });
        });
        res.json({ articles });
      } else {
        res.status(500).json({ error: 'Failed to fetch search results from Google Scholar' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
module.exports ={handleArticles}