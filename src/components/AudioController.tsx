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
  // playing 反映"音频实际是否在播放"。
  const [playing, setPlaying] = useState(false);
  // intentionallyPausedRef = 用户主动按按钮暂停的标记。
  // 只有当此标记为 true,真正的 pause 事件才会更新 UI 并保持暂停;
  // 否则任何来源的 pause(切标签、浏览器节流、bfcache 恢复、移动端来电等)
  // 都立即调用 audio.play() 恢复,保证"只能由喇叭按钮停止"。
  const intentionallyPausedRef = useRef(false);

  // 事件驱动:audio 元素自己的 play / pause 事件来更新 UI 状态,
  // 这样无论 play() 来自 toggle、autoplay 还是事件回调里的自动恢复,
  // 最终 `playing` state 一定与音频真实状态一致。
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;
    audio.loop = true;

    const onPlay = () => {
      intentionallyPausedRef.current = false;
      setPlaying(true);
    };

    const onPause = () => {
      if (intentionallyPausedRef.current) {
        // 用户主动按钮暂停 —— 接受暂停,更新 UI
        setPlaying(false);
        return;
      }
      // 非用户暂停(切标签、浏览器自动节流、focus 被抢、bfcache 恢复等)
      // → 立即恢复;失败(无用户手势)就静默忽略,等下次事件再试
      void audio.play().catch(() => {});
    };

    const onVisibility = () => {
      // 标签切回前台时,若音频被后台暂停且非用户主动暂停 → 恢复
      if (
        document.visibilityState === "visible" &&
        audio.paused &&
        !intentionallyPausedRef.current
      ) {
        void audio.play().catch(() => {});
      }
    };

    const onPageShow = (e: PageTransitionEvent) => {
      // 返回 / 前进时从 bfcache 恢复,部分浏览器会暂停媒体 → 主动恢复
      if (e.persisted && audio.paused && !intentionallyPausedRef.current) {
        void audio.play().catch(() => {});
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    // 初次挂载尝试 autoplay;多数浏览器会拦截,等用户首次点击按钮再启动
    void audio.play().catch(() => {});

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      // 用户主动暂停 —— 设标记后再 pause(),onPause 看到标记就放行,不再自恢复
      intentionallyPausedRef.current = true;
      audio.pause();
    } else {
      // 用户主动播放 —— 清掉"主动暂停"意图,后续任何被动暂停都会自恢复
      intentionallyPausedRef.current = false;
      void audio.play().catch(() => {});
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
        {playing ? <EqualizerBars /> : <SoundOffIcon />}
      </button>
    </>
  );
}

/* 三根细条的小均衡器 —— 播放中跳动,直观传达"音乐正在播"
   动画在 globals.css 的 .audio-eq 里定义 */
function EqualizerBars() {
  return (
    <span className="audio-eq" aria-hidden>
      <span />
      <span />
      <span />
    </span>
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
