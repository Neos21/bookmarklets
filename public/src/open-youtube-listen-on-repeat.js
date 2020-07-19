/**
 * Open YouTube Listen On Repeat
 * 
 * <p>現在見ている YouTube 動画を listenonrepeat.com で開きループ再生する。</p>
 */
((l) => {
  if(l.host.includes('youtube')) l.href = l.href.replace('youtube', 'youtuberepeat');
})(location);
