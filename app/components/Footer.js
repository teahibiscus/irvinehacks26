"use client";

export default function Footer({ onUpload, onMusic, onSend }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-end z-50" style={{ height: "96px", paddingLeft: "75px", paddingRight: "75px", paddingTop: "15px", paddingBottom: "15px" }}>
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 backdrop-blur-[2.5px] pointer-events-none rounded-[3px]"
        style={{
          backgroundImage: "url('https://www.figma.com/api/mcp/asset/89024711-cf5a-42e9-9880-3a71380d4146')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)"
        }}
      />
      
      {/* Button Container */}
      <div className="relative flex h-[50px]" style={{ gap: "20px" }}>
        
        {/* Upload Button - positioned at x=990 in 1290px container */}
        <button
          onClick={onUpload}
          className="group relative overflow-hidden transition-all hover:scale-105"
          style={{
            width: "80px",
            height: "50px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
            backdropFilter: "blur(17.84px)",
            boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25), -1.858px -1.732px 12px -8px rgba(156,205,248,0.15)"
          }}
          aria-label="Upload"
        >
          <img
            src="https://www.figma.com/api/mcp/asset/7934e0be-851e-403a-97e9-817bd17a150f"
            alt="Upload"
            style={{
              position: "absolute",
              left: "25px",
              top: "10px",
              width: "30px",
              height: "30px"
            }}
          />
          <div 
            className="absolute inset-[-1px] pointer-events-none rounded-[inherit]"
            style={{
              boxShadow: "inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)"
            }}
          />
        </button>

        
        {/* Music Button - positioned at x=1100 in 1290px container */}
        <button
          onClick={onMusic}
          className="group relative overflow-hidden transition-all"
          style={{
            width: "80px",
            height: "50px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
            backdropFilter: "blur(17.84px)",
            boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25), -1.858px -1.732px 12px -8px rgba(156,205,248,0.15)"
          }}
          aria-label="Music"
        >
          <img
            src="https://www.figma.com/api/mcp/asset/bbb43766-faf4-4bb0-9bd7-9d3813d5759a"
            alt="Music"
            style={{
              position: "absolute",
              left: "25px",
              top: "10px",
              width: "30px",
              height: "30px"
            }}
          />
          {/* Default state */}
          <div 
            className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 group-hover:opacity-0 group-active:opacity-0"
            style={{
              boxShadow: "inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)"
            }}
          />
          {/* Hover state */}
          <div 
            className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-0"
            style={{
              boxShadow: "inset 0px 5px 5px 5px rgba(255,255,255,0.5), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)"
            }}
          />
          {/* Clicked/Active state */}
          <div 
            className="absolute inset-[-1px] pointer-events-none rounded-[inherit] transition-shadow duration-200 opacity-0 group-active:opacity-100"
            style={{
              boxShadow: "inset 0px 4px 4px 0px rgba(0,0,0,0.25), inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)"
            }}
          />
        </button>

        
        {/* Music Button - positioned at x=1100 in 1290px container */}
        <button
          onClick={onSend}
          className="group relative overflow-hidden transition-all hover:scale-105"
          style={{
            width: "80px",
            height: "50px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "linear-gradient(90deg, rgba(156, 205, 248, 0.1) 0%, rgba(156, 205, 248, 0.1) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%)",
            backdropFilter: "blur(17.84px)",
            boxShadow: "0px 2px 4px 0px rgba(0,0,0,0.25), -1.858px -1.732px 12px -8px rgba(156,205,248,0.15)"
          }}
          aria-label="Send"
        >
          <img
            src="https://www.figma.com/api/mcp/asset/e1721e52-dbfe-491c-b569-305e1f35277a"
            alt="Send"
            style={{
              position: "absolute",
              left: "25px",
              top: "10px",
              width: "30px",
              height: "30px"
            }}
          />
          <div 
            className="absolute inset-[-1px] pointer-events-none rounded-[inherit]"
            style={{
              boxShadow: "inset 0px -1px 4px 0px #9ccdf8, inset 2.676px 2.494px 11.52px 0px rgba(156,205,248,0), inset 1.747px 1.628px 5.76px 0px rgba(255,255,255,0)"
            }}
          />
        </button>
      </div>
    </div>
  );
}
