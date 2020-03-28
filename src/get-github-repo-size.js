/**
 * GitHub ページを開いている時に実行すると、そのリポジトリのファイルサイズを GitHub API から取得する
 */
((getText, xhr, owner, repo, size) => {
  owner = getText('.author');
  repo  = getText('.mr-2>a');
  if(!owner || !repo) return;
  xhr.open('GET', 'https://api.github.com/repos/' + owner + '/' + repo, false);
  xhr.send();
  size = JSON.parse(xhr.response).size;
  alert(size + 'KB\n' + Math.floor(size / 1000) + 'MB');
})(
  (query, elem) => {
    elem = document.querySelector(query);
    return elem ? elem.innerText : null;
  },
  new XMLHttpRequest()
);