import { useId } from "react";

export type ServiceArtworkKind =
  | "design"
  | "web"
  | "mobile"
  | "software"
  | "saas"
  | "crm"
  | "cloud"
  | "marketing"
  | "seo"
  | "sem"
  | "social";

type Props = {
  kind: ServiceArtworkKind;
  label: string;
};

const accents: Record<ServiceArtworkKind, string> = {
  design: "#e879f9",
  web: "#60a5fa",
  mobile: "#38bdf8",
  software: "#c084fc",
  saas: "#2dd4bf",
  crm: "#818cf8",
  cloud: "#38bdf8",
  marketing: "#fb923c",
  seo: "#34d399",
  sem: "#fbbf24",
  social: "#f472b6",
};

function ArtworkScene({ kind }: { kind: ServiceArtworkKind }) {
  switch (kind) {
    case "design":
      return (
        <>
          <rect x="194" y="116" width="612" height="252" rx="22" fill="#111c39" stroke="#ffffff" strokeOpacity=".16" />
          <rect x="216" y="137" width="568" height="30" rx="9" fill="#1e2b4d" />
          <circle cx="235" cy="152" r="4" fill="#fb7185" />
          <circle cx="251" cy="152" r="4" fill="#fbbf24" />
          <circle cx="267" cy="152" r="4" fill="#34d399" />
          <rect x="218" y="183" width="110" height="163" rx="12" fill="#202d4d" />
          <rect x="233" y="199" width="80" height="52" rx="8" fill="#6844a8" />
          <path d="M234 242l25-24 18 15 13-11 22 29h-78z" fill="#f0abfc" opacity=".84" />
          <rect x="233" y="266" width="50" height="7" rx="4" fill="#d7e4ff" opacity=".72" />
          <rect x="233" y="282" width="68" height="5" rx="3" fill="#91a4cb" opacity=".55" />
          <rect x="233" y="298" width="58" height="5" rx="3" fill="#91a4cb" opacity=".42" />
          <rect x="344" y="183" width="252" height="163" rx="12" fill="#172441" />
          <rect x="361" y="199" width="130" height="9" rx="5" fill="#eef4ff" opacity=".85" />
          <rect x="361" y="218" width="208" height="5" rx="3" fill="#8fa3cb" opacity=".5" />
          <rect x="361" y="232" width="176" height="5" rx="3" fill="#8fa3cb" opacity=".38" />
          <rect x="361" y="252" width="218" height="78" rx="10" fill="#243658" />
          <path d="M375 310l44-36 33 20 32-26 38 17 42-33" fill="none" stroke="#e879f9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="612" y="183" width="172" height="163" rx="12" fill="#202d4d" />
          <rect x="628" y="199" width="83" height="7" rx="4" fill="#dce8ff" opacity=".8" />
          {[["#e879f9", 628], ["#60a5fa", 674], ["#34d399", 720], ["#fbbf24", 628], ["#fb7185", 674], ["#a78bfa", 720]].map(([color, x], i) => (
            <rect key={i} x={Number(x)} y={218 + Math.floor(i / 3) * 30} width="32" height="20" rx="6" fill={String(color)} />
          ))}
          <path d="M741 287l-13 43 13-10 11 12 9-7-11-12 17-5z" fill="#f8fafc" stroke="#192442" strokeWidth="3" strokeLinejoin="round" />
        </>
      );
    case "web":
      return (
        <>
          <rect x="154" y="104" width="692" height="286" rx="22" fill="#121e3b" stroke="#ffffff" strokeOpacity=".2" />
          <rect x="154" y="104" width="692" height="40" rx="22" fill="#202d4c" />
          <path d="M154 124v20h692v-20" fill="#202d4c" />
          <circle cx="178" cy="124" r="5" fill="#fb7185" /><circle cx="197" cy="124" r="5" fill="#fbbf24" /><circle cx="216" cy="124" r="5" fill="#34d399" />
          <rect x="259" y="115" width="316" height="17" rx="8" fill="#0d1730" />
          <rect x="177" y="164" width="128" height="204" rx="12" fill="#1b2a4b" />
          <rect x="194" y="183" width="74" height="8" rx="4" fill="#dbeafe" opacity=".8" />
          {[0, 1, 2, 3].map((v) => <g key={v}><rect x="194" y={208 + v * 33} width="11" height="11" rx="3" fill={v === 0 ? "#60a5fa" : "#536789"} /><rect x="214" y={210 + v * 33} width="68" height="6" rx="3" fill="#9bb0d4" opacity={v === 0 ? ".85" : ".5"} /></g>)}
          <rect x="324" y="164" width="498" height="94" rx="14" fill="#1d2c4d" />
          <rect x="344" y="183" width="150" height="9" rx="4" fill="#edf5ff" opacity=".88" />
          <rect x="344" y="202" width="202" height="6" rx="3" fill="#9bb0d4" opacity=".52" />
          <rect x="344" y="222" width="98" height="21" rx="8" fill="#2563eb" />
          <rect x="324" y="276" width="236" height="92" rx="14" fill="#1d2c4d" />
          <rect x="342" y="292" width="105" height="7" rx="4" fill="#e6f0ff" opacity=".72" />
          <path d="M343 347l34-20 30 9 43-31 38 15 51-26" fill="none" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="576" y="276" width="246" height="92" rx="14" fill="#1d2c4d" />
          {[0, 1, 2].map((v) => <g key={v}><rect x={594 + v * 69} y="295" width="53" height="54" rx="9" fill="#2a3c60" /><rect x={604 + v * 69} y={v === 1 ? "311" : "322"} width="33" height={v === 1 ? "25" : "14"} rx="5" fill={v === 1 ? "#60a5fa" : "#8299c1"} opacity=".9" /></g>)}
        </>
      );
    case "mobile":
      return (
        <>
          <circle cx="500" cy="250" r="176" fill="#12304b" opacity=".72" />
          <rect x="384" y="72" width="232" height="360" rx="40" fill="#0c1428" stroke="#bfe9ff" strokeOpacity=".76" strokeWidth="3" />
          <rect x="398" y="91" width="204" height="320" rx="29" fill="#172947" />
          <rect x="466" y="103" width="68" height="8" rx="4" fill="#061126" />
          <rect x="416" y="132" width="168" height="95" rx="17" fill="#21568b" />
          <circle cx="454" cy="170" r="21" fill="#54c5f3" opacity=".92" />
          <path d="M419 215l45-37 34 24 34-26 52 39z" fill="#66e0d4" opacity=".85" />
          <rect x="418" y="245" width="114" height="8" rx="4" fill="#eff7ff" opacity=".88" />
          <rect x="418" y="263" width="148" height="6" rx="3" fill="#a0b4d6" opacity=".58" />
          <rect x="418" y="287" width="73" height="62" rx="12" fill="#243b60" />
          <rect x="501" y="287" width="82" height="62" rx="12" fill="#243b60" />
          <path d="M432 330v-16l14-12 13 10 13-18" fill="none" stroke="#39d7c3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="542" cy="314" r="18" fill="#3479b9" /><path d="M542 302v24m-12-12h24" stroke="#dff8ff" strokeWidth="3" strokeLinecap="round" />
          <rect x="418" y="365" width="164" height="9" rx="5" fill="#3a5278" />
          <circle cx="290" cy="173" r="38" fill="#192d4d" stroke="#60a5fa" strokeOpacity=".72" /><rect x="272" y="162" width="36" height="7" rx="4" fill="#a9c9f8" /><rect x="272" y="176" width="25" height="6" rx="3" fill="#718bb5" />
          <circle cx="713" cy="319" r="45" fill="#192d4d" stroke="#38bdf8" strokeOpacity=".72" /><rect x="692" y="306" width="42" height="7" rx="4" fill="#c0e6ff" /><rect x="692" y="322" width="30" height="6" rx="3" fill="#718bb5" />
          <path d="M329 184c28 4 31 9 48 23M622 297c32-9 38-10 48-13" fill="none" stroke="#6dcaf2" strokeWidth="2" strokeDasharray="5 7" opacity=".8" />
        </>
      );
    case "software":
      return (
        <>
          <rect x="136" y="88" width="474" height="326" rx="21" fill="#0e172d" stroke="#b9a5ff" strokeOpacity=".45" />
          <rect x="136" y="88" width="474" height="42" rx="21" fill="#202947" /><path d="M136 109v21h474v-21" fill="#202947" />
          <circle cx="162" cy="109" r="5" fill="#fb7185" /><circle cx="181" cy="109" r="5" fill="#fbbf24" /><circle cx="200" cy="109" r="5" fill="#34d399" />
          <rect x="158" y="151" width="95" height="238" rx="10" fill="#18233e" />
          {[0, 1, 2, 3, 4].map((v) => <g key={v}><circle cx="176" cy={174 + v * 36} r="5" fill={v === 1 ? "#c084fc" : "#607399"} /><rect x="191" y={171 + v * 36} width={v % 2 ? 41 : 51} height="6" rx="3" fill="#9aaccb" opacity={v === 1 ? ".88" : ".52"} /></g>)}
          {[0, 1, 2, 3, 4, 5].map((v) => <g key={v}><rect x="272" y={158 + v * 32} width={v % 3 === 0 ? 68 : v % 3 === 1 ? 132 : 106} height="6" rx="3" fill={v % 3 === 0 ? "#c084fc" : v % 3 === 1 ? "#8bb9ee" : "#d8e5f9"} opacity=".8" /><rect x={v % 3 === 0 ? 350 : v % 3 === 1 ? 414 : 382} y={158 + v * 32} width={v % 2 ? 86 : 118} height="6" rx="3" fill="#687da4" opacity=".56" /></g>)}
          <circle cx="770" cy="230" r="88" fill="#26304d" stroke="#c084fc" strokeWidth="2" />
          <circle cx="770" cy="230" r="47" fill="#121c35" stroke="#a78bfa" strokeWidth="7" />
          <circle cx="770" cy="230" r="15" fill="#c084fc" />
          {[0, 1, 2, 3, 4, 5].map((v) => <rect key={v} x={756 + (v % 2) * 64} y={116 + Math.floor(v / 2) * 112} width="30" height="28" rx="7" fill="#334368" stroke="#9e87ea" strokeOpacity=".7" />)}
          <path d="M698 187l-25-24m194 0l-25 24m-144 88l-25 25m194-25l25 25M770 142v-22m0 220v-22" stroke="#bf9fff" strokeWidth="3" strokeLinecap="round" opacity=".84" />
          <circle cx="770" cy="128" r="5" fill="#eadcff" /><circle cx="674" cy="163" r="5" fill="#eadcff" /><circle cx="866" cy="163" r="5" fill="#eadcff" />
        </>
      );
    case "saas":
      return (
        <>
          <path d="M316 243c0-43 35-78 78-78 13 0 26 3 37 9 19-38 58-64 104-64 64 0 116 52 116 116 39 5 69 38 69 78 0 43-35 78-78 78H397c-45 0-81-35-81-78 0-28 14-51 36-65z" fill="#173956" stroke="#75e4d0" strokeWidth="3" />
          <path d="M438 249l61 46 72-68 75 46" fill="none" stroke="#48dbc2" strokeWidth="4" strokeDasharray="8 8" />
          <g fill="#1c2948" stroke="#78f0d4" strokeWidth="2">
            <rect x="145" y="132" width="175" height="104" rx="18" />
            <rect x="145" y="298" width="175" height="104" rx="18" />
            <rect x="680" y="112" width="175" height="104" rx="18" />
            <rect x="680" y="307" width="175" height="104" rx="18" />
          </g>
          {[["#38bdf8", 181, 168], ["#c084fc", 181, 334], ["#fbbf24", 716, 148], ["#fb7185", 716, 343]].map(([c, x, y], i) => <g key={i}><circle cx={Number(x)} cy={Number(y)} r="15" fill={String(c)} /><rect x={Number(x) + 27} y={Number(y) - 8} width="78" height="7" rx="4" fill="#e1efff" opacity=".86" /><rect x={Number(x) + 27} y={Number(y) + 7} width="54" height="5" rx="3" fill="#8ba8cd" opacity=".64" /></g>)}
          <circle cx="532" cy="255" r="39" fill="#2c826f" stroke="#83f3db" strokeWidth="3" />
          <path d="M532 232v46m-23-23h46" stroke="#ddfff7" strokeWidth="5" strokeLinecap="round" />
        </>
      );
    case "crm":
      return (
        <>
          <rect x="135" y="91" width="730" height="318" rx="23" fill="#121d39" stroke="#a5b4fc" strokeOpacity=".5" />
          <rect x="135" y="91" width="730" height="48" rx="23" fill="#222e50" /><path d="M135 115v24h730v-24" fill="#222e50" />
          <circle cx="162" cy="115" r="6" fill="#818cf8" /><rect x="181" y="107" width="195" height="15" rx="7" fill="#0e1932" />
          <rect x="158" y="158" width="172" height="225" rx="14" fill="#1e2c4c" />
          <circle cx="201" cy="204" r="21" fill="#818cf8" /><circle cx="201" cy="197" r="7" fill="#e0e7ff" /><path d="M188 216c3-12 23-12 26 0" fill="#e0e7ff" />
          <rect x="235" y="193" width="70" height="7" rx="4" fill="#eff2ff" opacity=".86" /><rect x="235" y="210" width="54" height="6" rx="3" fill="#9faecc" opacity=".7" />
          <rect x="177" y="244" width="128" height="6" rx="3" fill="#8394b9" /><rect x="177" y="262" width="104" height="6" rx="3" fill="#8394b9" opacity=".72" />
          <rect x="177" y="292" width="128" height="66" rx="10" fill="#2a3a5e" /><path d="M190 340l22-22 17 11 24-28 37 31" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1, 2].map((col) => <g key={col}><rect x={352 + col * 166} y="158" width="150" height="225" rx="13" fill="#192743" /><rect x={369 + col * 166} y="177" width="80" height="7" rx="4" fill="#dce6ff" opacity=".8" /><circle cx={382 + col * 166} cy="211" r="12" fill={["#818cf8", "#38bdf8", "#34d399"][col]} /><rect x={402 + col * 166} y="207" width="75" height="7" rx="4" fill="#dce6ff" opacity=".74" /><rect x={370 + col * 166} y="236" width="114" height="44" rx="9" fill="#263657" /><rect x={370 + col * 166} y="292" width="114" height="44" rx="9" fill="#263657" /></g>)}
          <path d="M332 267h14m152 0h14m152 0h14" stroke="#9aabed" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "cloud":
      return (
        <>
          <path d="M333 188c0-42 34-76 76-76 13 0 25 3 35 10 19-34 55-57 96-57 61 0 110 49 110 110 36 5 64 36 64 73 0 41-33 74-74 74H406c-40 0-73-33-73-74 0-26 13-48 34-60z" fill="#173756" stroke="#6bd1ff" strokeWidth="3" />
          <path d="M500 157v93m0-93l-28 28m28-28l28 28" fill="none" stroke="#a3e7ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1, 2].map((v) => <g key={v}><rect x={207 + v * 218} y="299" width="150" height="108" rx="14" fill="#111c35" stroke="#58c8f5" strokeOpacity=".74" /><rect x={224 + v * 218} y="316" width="116" height="26" rx="7" fill="#203352" /><circle cx={240 + v * 218} cy="329" r="4" fill="#38bdf8" /><rect x={224 + v * 218} y="352" width="116" height="38" rx="7" fill="#1a2946" /><path d={`M${237 + v * 218} 365h90m-90 10h67`} stroke="#7f9ec8" strokeWidth="4" strokeLinecap="round" /></g>)}
          <path d="M282 276v17m218-17v17m218-17v17" stroke="#70d7ff" strokeWidth="3" strokeDasharray="5 6" />
          <circle cx="282" cy="275" r="6" fill="#c7f2ff" /><circle cx="500" cy="275" r="6" fill="#c7f2ff" /><circle cx="718" cy="275" r="6" fill="#c7f2ff" />
        </>
      );
    case "marketing":
      return (
        <>
          <rect x="150" y="98" width="700" height="292" rx="22" fill="#121e3b" stroke="#fdba74" strokeOpacity=".42" />
          <rect x="150" y="98" width="700" height="43" rx="22" fill="#222d4a" /><path d="M150 119v22h700v-22" fill="#222d4a" />
          <circle cx="177" cy="119" r="5" fill="#fb923c" /><rect x="198" y="111" width="176" height="15" rx="7" fill="#101a32" />
          <rect x="174" y="161" width="174" height="90" rx="13" fill="#202f4e" /><rect x="192" y="178" width="72" height="6" rx="3" fill="#dbe7fa" opacity=".75" /><rect x="192" y="199" width="93" height="23" rx="7" fill="#f97316" opacity=".9" /><rect x="192" y="232" width="119" height="5" rx="3" fill="#879cbe" opacity=".54" />
          <rect x="364" y="161" width="224" height="90" rx="13" fill="#202f4e" /><rect x="382" y="178" width="114" height="6" rx="3" fill="#dbe7fa" opacity=".75" /><path d="M388 226l34-22 33 11 34-28 32 15 47-19" fill="none" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="604" y="161" width="222" height="90" rx="13" fill="#202f4e" /><rect x="622" y="178" width="105" height="6" rx="3" fill="#dbe7fa" opacity=".75" />{[0, 1, 2, 3, 4].map((v) => <rect key={v} x={626 + v * 34} y={225 - [18, 34, 25, 47, 58][v]} width="19" height={[18, 34, 25, 47, 58][v]} rx="5" fill={v === 4 ? "#fb923c" : "#6586b4"} />)}
          <rect x="174" y="269" width="652" height="96" rx="13" fill="#1c2b49" />
          {[0, 1, 2, 3, 4, 5, 6].map((v) => <g key={v}><circle cx={215 + v * 89} cy="311" r="18" fill={["#fb923c", "#60a5fa", "#c084fc", "#34d399", "#f472b6", "#fbbf24", "#38bdf8"][v]} opacity=".86" /><rect x={191 + v * 89} y="341" width="48" height="5" rx="3" fill="#adbed9" opacity=".55" /></g>)}
        </>
      );
    case "seo":
      return (
        <>
          <rect x="159" y="102" width="682" height="286" rx="22" fill="#121e39" stroke="#6ee7b7" strokeOpacity=".48" />
          <rect x="184" y="128" width="436" height="44" rx="14" fill="#202f4c" stroke="#6ee7b7" strokeOpacity=".36" />
          <circle cx="207" cy="150" r="8" fill="none" stroke="#6ee7b7" strokeWidth="3" /><path d="M213 156l8 8" stroke="#6ee7b7" strokeWidth="3" strokeLinecap="round" /><rect x="234" y="146" width="221" height="7" rx="4" fill="#dceafa" opacity=".64" /><rect x="466" y="145" width="125" height="10" rx="5" fill="#34d399" opacity=".72" />
          <rect x="184" y="191" width="250" height="168" rx="14" fill="#1d2b49" /><rect x="203" y="209" width="122" height="7" rx="4" fill="#ecfdf5" opacity=".78" /><path d="M204 328l41-38 30 16 35-41 32 15 69-55" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {[0, 1, 2, 3].map((v) => <path key={v} d={`M204 ${247 + v * 24}h210`} stroke="#526889" strokeOpacity=".42" strokeWidth="1" />)}
          <path d="M685 195a71 71 0 1 0 0 142 71 71 0 1 0 0-142zm50 119l50 50" fill="#15213d" stroke="#66e0b3" strokeWidth="10" strokeLinecap="round" />
          <path d="M643 298l25-30 22 13 32-43" fill="none" stroke="#c3ffe5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="722" cy="238" r="5" fill="#c3ffe5" />
        </>
      );
    case "sem":
      return (
        <>
          <rect x="145" y="103" width="438" height="287" rx="20" fill="#121e38" stroke="#fcd34d" strokeOpacity=".48" />
          <rect x="145" y="103" width="438" height="40" rx="20" fill="#26304a" /><path d="M145 123v20h438v-20" fill="#26304a" />
          <circle cx="168" cy="123" r="5" fill="#fbbf24" /><rect x="187" y="116" width="154" height="14" rx="7" fill="#111b34" />
          <rect x="169" y="161" width="390" height="53" rx="11" fill="#202f4c" /><rect x="185" y="175" width="126" height="7" rx="4" fill="#fff7d6" opacity=".87" /><rect x="185" y="191" width="227" height="5" rx="3" fill="#a1b2ce" opacity=".58" /><rect x="492" y="175" width="49" height="24" rx="8" fill="#eaaa24" />
          <rect x="169" y="226" width="390" height="53" rx="11" fill="#202f4c" /><rect x="185" y="240" width="155" height="7" rx="4" fill="#fff7d6" opacity=".87" /><rect x="185" y="256" width="249" height="5" rx="3" fill="#a1b2ce" opacity=".58" /><rect x="492" y="240" width="49" height="24" rx="8" fill="#eaaa24" />
          <rect x="169" y="291" width="390" height="76" rx="11" fill="#202f4c" /><rect x="185" y="308" width="149" height="7" rx="4" fill="#fff7d6" opacity=".87" /><rect x="185" y="325" width="205" height="5" rx="3" fill="#a1b2ce" opacity=".58" /><rect x="492" y="308" width="49" height="24" rx="8" fill="#eaaa24" />
          <circle cx="741" cy="239" r="108" fill="#3c3321" stroke="#fbbf24" strokeOpacity=".65" strokeWidth="2" />
          <circle cx="741" cy="239" r="76" fill="none" stroke="#fcd34d" strokeOpacity=".45" strokeWidth="2" /><circle cx="741" cy="239" r="42" fill="none" stroke="#fcd34d" strokeOpacity=".62" strokeWidth="2" />
          <circle cx="741" cy="239" r="13" fill="#fbbf24" /><path d="M741 239l64-67" stroke="#fff3c0" strokeWidth="5" strokeLinecap="round" /><path d="M805 172l-5 23-18-18z" fill="#fff3c0" />
        </>
      );
    case "social":
      return (
        <>
          <rect x="317" y="65" width="366" height="391" rx="38" fill="#0e172e" stroke="#f9a8d4" strokeOpacity=".72" strokeWidth="3" />
          <rect x="333" y="84" width="334" height="352" rx="26" fill="#192744" />
          <rect x="438" y="95" width="124" height="8" rx="4" fill="#091328" />
          <circle cx="373" cy="130" r="17" fill="#f472b6" /><rect x="402" y="123" width="114" height="7" rx="4" fill="#fce7f3" opacity=".87" /><rect x="402" y="137" width="77" height="5" rx="3" fill="#9eafca" opacity=".65" /><circle cx="626" cy="131" r="4" fill="#d9e4fb" />
          <rect x="351" y="164" width="298" height="153" rx="13" fill="#34496d" />
          <path d="M351 293l74-77 55 42 51-55 118 104z" fill="#e879f9" opacity=".84" /><circle cx="571" cy="198" r="21" fill="#ffd27a" />
          <path d="M353 336h18m15 0h18m16 0h18m15 0h18" stroke="#f472b6" strokeWidth="5" strokeLinecap="round" />
          <rect x="352" y="356" width="243" height="6" rx="3" fill="#d5e0f5" opacity=".72" /><rect x="352" y="372" width="196" height="5" rx="3" fill="#9baecc" opacity=".56" />
          <circle cx="368" cy="402" r="10" fill="#f472b6" /><circle cx="405" cy="402" r="10" fill="#647b9f" /><circle cx="442" cy="402" r="10" fill="#647b9f" />
          <circle cx="205" cy="184" r="49" fill="#242b4b" stroke="#f472b6" strokeOpacity=".7" /><path d="M188 185c8-21 19-21 34 0-12 15-22 15-34 0z" fill="none" stroke="#ffc2e1" strokeWidth="4" /><circle cx="205" cy="185" r="7" fill="#ffc2e1" />
          <circle cx="790" cy="304" r="56" fill="#242b4b" stroke="#c084fc" strokeOpacity=".7" /><path d="M765 304h50m-25-25v50" stroke="#e9d5ff" strokeWidth="5" strokeLinecap="round" />
          <path d="M254 193c31 6 40 17 63 30m366 61c34 1 57 7 77 15" fill="none" stroke="#ec8ec8" strokeWidth="2" strokeDasharray="5 7" opacity=".85" />
        </>
      );
  }
}

export default function ServiceArtwork({ kind, label }: Props) {
  const id = useId().replaceAll(":", "");
  const accent = accents[kind];

  return (
    <svg
      viewBox="0 0 1000 480"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#071329" />
          <stop offset=".55" stopColor="#102442" />
          <stop offset="1" stopColor="#17234a" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx=".5" cy=".5" r=".5">
          <stop stopColor={accent} stopOpacity=".34" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="34" height="34" patternUnits="userSpaceOnUse">
          <path d="M34 0H0v34" fill="none" stroke="#c5dcff" strokeOpacity=".055" strokeWidth="1" />
        </pattern>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#020617" floodOpacity=".42" />
        </filter>
      </defs>
      <rect width="1000" height="480" fill={`url(#${id}-base)`} />
      <rect width="1000" height="480" fill={`url(#${id}-grid)`} />
      <ellipse cx="500" cy="245" rx="430" ry="220" fill={`url(#${id}-glow)`} />
      <g filter={`url(#${id}-shadow)`}>
        <ArtworkScene kind={kind} />
      </g>
      <path d="M0 424c195-47 314 42 493 8s293-68 507-12v60H0z" fill="#071329" opacity=".42" />
      <circle cx="890" cy="76" r="3" fill={accent} />
      <circle cx="107" cy="380" r="2.5" fill="#d4e7ff" opacity=".68" />
      <path d="M838 73l17-17m-17 0l17 17" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity=".65" />
    </svg>
  );
}
