/**
 * EC Navi PeX News Clicker
 * 
 * <p>EC ナビ、PeX の「まいにちニュース」の気持ちを自動回答する。</p>
 */
((elem) => {
  return ['angry', 'sad', 'cool', 'like']
    .map((name) => {
      return '#submit-' + name;
    })
    .concat(
      ['bad', 'sad', 'glad', 'good']
        .map((name) => {
          return ['.btn_' + name, '.btn_feeling_' + name];
        })
        .flat()
    )
    .some((name) => {
      return (elem = document.querySelector(name)) && (elem.scrollIntoView(), elem.click(), true);
    });
})();
