/**
 * GitHub リポジトリのページを開いていたら GitHub Pages に、
 * GitHub Pages を開いていたら GitHub リポジトリのページを開く
 */
((inputUrl, resultUrl) => {
  // Remove 'http://', 'https://', 'www.'
  inputUrl = location.href.replace((/^https?:\/\//u), '').replace((/^www\./u), '');
  
  if(inputUrl.match(/^github\.com/u)) {
    // Repository : GitHub Pages
    resultUrl = `${inputUrl}/`.replace((/^github\.com\/(.*?)\//u), '$1.github.io/')
                              .replace((/^(.*?)\.github\.io\/(.*?)\/.*/u), '$1.github.io/$2')
                              .replace((/\/(.*?)\.github\.io$/u), '');
  }
  else if(inputUrl.match(/^(.*?)\.github\.io/u)) {
    // GitHub Pages : Repository
    resultUrl = inputUrl.replace((/^(.*)\.github\.io/u), 'github.com/$1')
                        .replace((/^github\.com\/(.*?)\/(.*?)\/.*/u), 'github.com/$1/$2')
                        .replace((/^github\.com\/(.*?)\/(.*?)\.(html|css|js)$/u), 'github.com/$1')
  }
  
  if(resultUrl) {
    open(`https://${resultUrl.replace((/\/$/u), '')}`);
  } else {
    alert('Invalid URL');
  }
})();
