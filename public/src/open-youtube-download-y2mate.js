/**
 * Open YouTube Download y2mate
 * 
 * <p>現在見ている YouTube 動画を y2mate.com でダウンロードする。</p>
 */
((l) => {
  if(l.host.includes('youtube')) l.href = l.href.replace('youtube', 'youtubepp');
})(location);
