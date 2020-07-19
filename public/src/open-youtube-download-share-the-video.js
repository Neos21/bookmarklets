/**
 * Open YouTube Download Share The Video
 * 
 * <p>現在見ている YouTube 動画を sharethevideo.com でダウンロードする。</p>
 */
((l) => {
  if(l.host.includes('youtube')) l.href = 'https://www.savethevideo.com/download?url=' + l.href;
})(location);
