"use client";

import { siteConfig } from "@/data/site.config";

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-6 md:right-6">
      <a
        href={siteConfig.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 min-h-[44px] min-w-[44px] items-center gap-0 overflow-hidden rounded-full bg-[#25D366] pl-3.5 pr-3.5 text-white shadow-[var(--shadow-hover)] transition-all duration-500 hover:gap-2.5 hover:pr-5 md:animate-[pulse-soft_3s_ease-in-out_infinite] md:hover:animate-none"
        aria-label="Chat with ALUECO on WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
          <path d="M12 2C6.5 2 2 6.2 2 11.4c0 2 .6 3.9 1.6 5.5L2 22l5.3-1.4A9.8 9.8 0 0012 20.8C17.5 20.8 22 16.6 22 11.4S17.5 2 12 2zm0 17.4c-1.6 0-3.1-.5-4.4-1.3l-.3-.2-3.1.8.8-3-.2-.3A7.5 7.5 0 014.5 11.4c0-4.1 3.4-7.4 7.5-7.4s7.5 3.3 7.5 7.4-3.4 7.4-7.5 7.4zm4.2-5.5c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.9-.1.1-.3.1-.5 0-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.2 0-.3 0-.1-.5-1.3-.7-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.5.3-.2.2-.7.7-.7 1.7 0 1 .7 2 1 2.1.1.1 2 3 4.9 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.1-.4-.2z" />
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-500 group-hover:max-w-[140px] group-hover:opacity-100">
          Chat with ALUECO
        </span>
      </a>
    </div>
  );
}
