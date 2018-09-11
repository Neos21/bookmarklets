/**
 * アンケートサイト自動回答ブックマークレット
 * 
 * 以下のように個人情報と設定項目を指定し、このブックマークレットを読み込んで使う。
 * 
 * ```javascript
 * javascript:((d,s,e)=>{
 *   e=()=>{
 *     N21SH({
 *       cityName:'東京',
 *       districtName:'足立',
 *       age:25,
 *       ageRange:20,
 *       birthYear:1993,
 *       birthMonth:2,
 *       birthDate:24,
 *       gender:'女',
 *       marriage:'未婚',
 *       jobRegExp:'正社|社員'
 *     },{
 *       loop:5
 *     })
 *   };
 *   s=d.createElement('script');
 *   s.onload=e;
 *   s.src='https://neos21.github.io/bookmarklets/survey-helpers.js';
 *   d.body.appendChild(s)
 * })(document);
 * 
 * 1行にすると以下のとおり。
 * 
 * ```javascript
 * javascript:((d,s,e)=>{e=()=>{N21SH({cityName:'東京',districtName:'足立',age:25,ageRange:20,birthYear:1993,birthMonth:2,birthDate:24,gender:'女',marriage:'未婚',jobRegExp:'正社|社員'},{loop:5})};s=d.createElement('script');s.onload=e;s.src='https://neos21.github.io/bookmarklets/survey-helpers.js';d.body.appendChild(s)})(document);
 * ```
 */
function N21SH(myInfo, settings) {
  // 引数未指定の場合は中止する
  if(!myInfo || !settings) {
    return;
  }
  
  // 個人情報
  const cityName     = myInfo.cityName     || '都道府県';  // 都道府県 : 「都道府県」は書かない
  const districtName = myInfo.districtName || '行政区';    // 行政区 : 東京23区用・「区」は書かない
  const age          = myInfo.age          || 999;         // 年齢
  const ageRange     = myInfo.ageRange     || 999;         // 年齢層 : 「20代」とか「20～29歳」とかの選択肢用
  const birthYear    = myInfo.birthYear    || 9999;        // 誕生年
  const birthMonth   = myInfo.birthMonth   || 13;          // 誕生月
  const birthDate    = myInfo.birthDate    || 32;          // 誕生日
  const gender       = myInfo.gender       || '性別';      // 性別 : '男' か '女' あたりを想定
  const marriage     = myInfo.marriage     || '婚姻状態';  // 婚姻状態 : '未婚' か '既婚' あたりを想定
  const jobRegExp    = myInfo.jobRegExp    || '職業';      // 職業 : 正規表現 "()" で囲んで OR 検索するので "|" で区切る
  
  // 設定項目
  const loop = settings.loop || 5;  // 親要素を遡る階層数
  
  const doc = document;
  const queryAll = 'querySelectorAll';
  
  
  // セレクトボックス選択
  // --------------------------------------------------------------------------------
  
  // セレクトボックスで使用する条件まとめ
  const optionConditions = {
    // 住所か年齢か誕生日
    something: new RegExp(cityName
                          + '|' + districtName
                          + '|' + age + '.*[歳|才]'
                          + '|' + birthYear
                          + '|' + birthMonth + '.*月'
                          + '|' + birthDate + '.*日')
  };
  
  // select 要素を探索する
  [].forEach.call(doc[queryAll]('select'), (select) => {
    // その select 要素内の option 要素で探索が終わった場合は処理を中断するためのフラグ
    let finished = false;
    
    [].forEach.call(select.querySelectorAll('option'), (option) => {
      // この select 要素が探索済なら中断する
      if(finished) {
        return;
      }
      
      const innerHTML = option.innerHTML;
      
      if(optionConditions.something.test(innerHTML)) {
        // いずれかの情報に合致したら option 要素を選択する
        option.selected = true;
        finished = true;
      }
      else if(/1|2/.test(innerHTML)) {
        // 1 か 2 が含まれていたら月か日のセレクトボックスと予想して処理する
        let isMonth = false;
        let isDate  = false;
        
        // その option 要素が所属する select 要素を全探索して、セレクトボックスが月か日のセレクトボックスかどうか判定する
        [].forEach.call(select.querySelectorAll('option'), (selectOption) => {
          const selectOptionInnerHTML = selectOption.innerHTML;
          
          if(selectOptionInnerHTML.includes(12)) {
            // 12 を含む選択肢があれば「月」セレクトボックスと予想する
            isMonth = true;
          }
          else if(selectOptionInnerHTML.includes(13)) {
            // 13 を含む選択肢があれば「月」ではなく「日」セレクトボックスと予想する
            isMonth = false;
            isDate = true;
          }
          else if(selectOptionInnerHTML.includes(32)) {
            // 32 を含む選択肢があれば「月」でも「日」でもない (都道府県セレクトボックスなどの項番と判定)
            isMonth = false;
            isDate = false;
          }
        });
        
        // 「月」セレクトボックスもしくは「日」セレクトボックスと予想した時に対象の option 要素を選択する
        if((isMonth && innerHTML.includes(birthMonth)) || (isDate && innerHTML.includes(birthDate))) {
          option.selected = true;
          finished = true;
        }
      }
    });
  });
  
  
  // テキストボックス入力
  // --------------------------------------------------------------------------------
  
  // Type が text か tel の要素を探索する
  [].forEach.call(doc[queryAll]('[type=text],[type=tel]'), (textbox) => {
    // 親要素に遡っていくための変数
    let parent = textbox;
    // 親要素を遡っての探索が済んでいることを示すフラグ
    let finished = false;
    
    // 親要素を遡る
    for(let i = 0; i < loop; i++) {
      // 探索済なら中断する
      if(finished) {
        continue;
      }
      
      // 親要素の innerHTML を取得する
      parent = parent.parentNode;
      const innerHTML = parent.innerHTML;
      
      // 親要素の innerHTML からそれらしい文言を見付けたら対応する値を設定する
      if(/歳|才/.test(innerHTML)) {
        textbox.value = age;
        finished = true;
      }
      else if(innerHTML.includes('年')) {
        textbox.value = birthYear;
        finished = true;
      }
      else if(innerHTML.includes('月')) {
        textbox.value = birthMonth;
        finished = true;
      }
      else if(innerHTML.includes('日')) {
        textbox.value = birthDate;
        finished = true;
      }
    }
  });
  
  
  // ラジオボタン選択
  // --------------------------------------------------------------------------------
  
  // ラジオボタンで使用する条件まとめ
  const radioConditions = {
    // 都道府県か行政区か性別か年齢層か職業か婚姻状態
    something: new RegExp(cityName
                          + '|' + districtName
                          + '|' + gender
                          + '|' + ageRange + '.*[～|代](?!未満)'
                          + '|' + '(' + jobRegExp + ')'
                          + '|' + marriage)
  };
  
  // 1つ前に探索したラジオボタンの情報を控えておく : よりラジオボタンに近い階層で該当項目を見付けた方を優先させるため
  const radioPrev = {
    name: '',
    loop: -1
  };
  
  // Type が radio の要素を探索する
  [].forEach.call(doc[queryAll]('[type=radio]'), (radio) => {
    // 異なるラジオボタン群が出てきたら、直前に探索したラジオボタンの情報をリセットする
    if((radioPrev.name !== '' && radioPrev.loop !== -1) && radio.name !== radioPrev.name) {
      radioPrev.name = '';
      radioPrev.loop = -1;
    }
    
    // 親要素に遡っていくための変数
    let parent = radio;
    // 親要素を遡っての探索が済んでいることを示すフラグ
    let finished = false;
    
    // 親要素を遡る
    for(let i = 0; i < loop; i++) {
      // 探索済なら中断する
      if(finished) {
        continue;
      }
      
      // 親要素の innerHTML を取得する
      parent = parent.parentNode;
      let innerHTML = parent.innerHTML;
      
      // そのラジオボタン群で初めての場合か、より近いラジオボタンを見付けたら
      if(radioConditions.something.test(innerHTML)
         && ((radioPrev.name === '' && radioPrev.loop === -1) || (radio.name === radioPrev.name && i < radioPrev.loop))) {
        // 探索したラジオボタンの情報として登録しておく
        radioPrev.name = radio.name;
        radioPrev.loop = i;
        radio.checked = true;
        finished = true;
      }
    }
  });
}
