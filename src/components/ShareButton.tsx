import { useState, useRef, useEffect } from 'react';
const ShareIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 483 483">
    <path d="M395.72,0c-48.204,0-87.281,39.078-87.281,87.281c0,2.036,0.164,4.03,0.309,6.029l-161.233,75.674
      c-15.668-14.971-36.852-24.215-60.231-24.215c-48.204,0.001-87.282,39.079-87.282,87.282c0,48.204,39.078,87.281,87.281,87.281
      c15.206,0,29.501-3.907,41.948-10.741l69.789,58.806c-3.056,8.896-4.789,18.396-4.789,28.322c0,48.204,39.078,87.281,87.281,87.281
      c48.205,0,87.281-39.078,87.281-87.281s-39.077-87.281-87.281-87.281c-15.205,0-29.5,3.908-41.949,10.74l-69.788-58.805
      c3.057-8.891,4.789-18.396,4.789-28.322c0-2.035-0.164-4.024-0.308-6.029l161.232-75.674c15.668,14.971,36.852,24.215,60.23,24.215
      c48.203,0,87.281-39.078,87.281-87.281C482.999,39.079,443.923,0,395.72,0z" />
  </svg>
);

interface Props {
  onCapture: () => Promise<Blob | null>;
}

type Platform =
  | { name: string; icon: string; type: 'link'; urlTemplate: string }
  | { name: string; icon: string; type: 'download-only'; tip: string };

const socialPlatforms: Platform[] = [
  { name: 'Twitter / X', icon: '𝕏', type: 'link', urlTemplate: 'https://twitter.com/intent/tweet?text={text}' },
  { name: 'Facebook', icon: 'f', type: 'link', urlTemplate: 'https://www.facebook.com/sharer/sharer.php?quote={text}' },
  { name: 'Instagram', icon: 'Ig', type: 'download-only', tip: '图片已保存，请打开 Instagram App 发布' },
  { name: 'WhatsApp', icon: 'W', type: 'link', urlTemplate: 'https://wa.me/?text={text}' },
  { name: '微信朋友圈', icon: '朋', type: 'download-only', tip: '图片已保存，请打开微信 → 朋友圈发布' },
  { name: 'Weibo', icon: '微', type: 'link', urlTemplate: 'https://service.weibo.com/share/share.php?title={text}' },
];

export default function ShareButton({ onCapture }: Props) {
  const [open, setOpen] = useState(false);
  const [sharing, setSharing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleNativeShare = async () => {
    setSharing(true);
    try {
      const blob = await onCapture();
      if (!blob) return;
      const file = new File([blob], 'cal-plog.png', { type: 'image/png' });
      await navigator.share({
        title: 'My Cal Plog',
        text: 'Check out my calendar photo collage!',
        files: [file],
      });
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    } finally {
      setSharing(false);
      setOpen(false);
    }
  };

  const downloadImage = async (): Promise<boolean> => {
    const blob = await onCapture();
    if (!blob) return false;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'cal-plog.png';
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  };

  const handlePlatformClick = async (platform: Platform) => {
    setSharing(true);
    try {
      const downloaded = await downloadImage();
      if (!downloaded) return;

      if (platform.type === 'link') {
        const shareText = encodeURIComponent('Check out my calendar photo collage! #CalPlog');
        const shareUrl = platform.urlTemplate.replace('{text}', shareText);
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      } else {
        alert(platform.tip);
      }
    } finally {
      setSharing(false);
      setOpen(false);
    }
  };

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const supportsNativeShare =
    isMobile &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        disabled={sharing}
        className="px-3 py-1.5 bg-accent text-white text-sm rounded-md flex items-center gap-1.5
                   hover:opacity-90 transition-colors duration-default ease-default cursor-pointer font-body
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ShareIcon />
        {sharing ? 'Sharing…' : 'Share'}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-lg shadow-lg z-50 py-1 animate-in fade-in slide-in-from-top-1">
          {supportsNativeShare && (
            <>
              <button
                onClick={handleNativeShare}
                className="w-full text-left px-3 py-2 text-sm text-ink hover:bg-bg transition-colors font-body flex items-center gap-2"
              >
                <span className="w-5 text-center text-base">📤</span>
                Share…
              </button>
              <div className="border-t border-border my-1" />
            </>
          )}
          {socialPlatforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handlePlatformClick(platform)}
              className="w-full text-left px-3 py-2 text-sm text-ink hover:bg-bg transition-colors font-body flex items-center gap-2"
            >
              <span className="w-5 text-center text-xs font-bold text-muted">{platform.icon}</span>
              {platform.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
