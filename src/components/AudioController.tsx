"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 背景音乐控制器。
 *
 * - 隐藏 <audio> 元素 + 右上角浮动按钮。
 * - 组件挂载时尝试自动播放;浏览器拦截则保持暂停,等待用户点按钮。
 * - 按钮在 Intro 动画结束后通过 CSS animation 自然淡入(见 globals.css 的
 *   .audio-btn-reveal),不依赖 introDone state,避免跨组件 prop drilling。
 *
 * ─── 调参速查 ────────────────────────────────────────────
 *  · 音频路径   : 下方 AUDIO_SRC 常量
 *  · 默认音量   : 下方 DEFAULT_VOLUME 常量(0.0 - 1.0)
 *  · 按钮位置   : 下方 button 的 className 里 top-[88px] right-8 z-40
 *  · 按钮淡入时机: globals.css 中 .audio-btn-reveal 的 animation-delay
 */

const AUDIO_SRC = "/works/music/01.mp3";
const DEFAULT_VOLUME = 0.25;

export default function AudioController() {
  const audioRef = useRef<HTMLAudioElement>(null);
  // playing 反映"音频实际是否在播放",而不是用户意图。autoplay 被拦截时为 false。
  const [playing, setPlaying] = useState(false);

  // 挂载即尝试 autoplay
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;
    audio.loop = true;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // 多数浏览器会拦截带声音的 autoplay。保持暂停,按钮显示"未播放"图标,
        // 用户点击即可触发播放(此时已是用户手势,允许)。
        setPlaying(false);
      });
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // 极少数情况仍被拦截,什么也不做
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        aria-hidden
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={
          playing ? "Mute background music" : "Play background music"
        }
        aria-pressed={playing}
        className="audio-btn-reveal fixed right-8 top-[88px] z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-brand"
      >
        {playing ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>
    </>
  );
}

/* 极简喇叭(声音开) */
function SoundOnIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
      <path
        d="M15.54 8.46a5 5 0 0 1 0 7.07"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* 极简喇叭(声音关 / 静音) */
function SoundOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" />
      <path
        d="M22 9l-6 6M16 9l6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
