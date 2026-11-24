const artworks = [
  {id:1,title:"After the Rain",artist:"Amara M.",place:"Kampala, Uganda",category:"Painting",year:"2026",image:"https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=85",description:"A study of colour, memory and the quiet beauty that follows a storm."},
  {id:2,title:"A Different Horizon",artist:"Daniel K.",place:"Nairobi, Kenya",category:"Digital",year:"2026",image:"https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85",description:"A digital exploration of imagined landscapes and possible futures."},
  {id:3,title:"Quiet Geometry",artist:"Zuri N.",place:"Kigali, Rwanda",category:"Photography",year:"2025",image:"https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",description:"Architecture, light and the patterns hidden in everyday spaces."},
  {id:4,title:"The Shape of Us",artist:"Amara M.",place:"Kampala, Uganda",category:"Painting",year:"2026",image:"https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85",description:"An expressive composition about identity, connection and belonging."},
  {id:5,title:"Earth Form",artist:"Moses T.",place:"Entebbe, Uganda",category:"Sculpture",year:"2025",image:"https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=85",description:"A material-led experiment inspired by organic forms and the natural world."},
  {id:6,title:"Blue Hour",artist:"Zuri N.",place:"Kigali, Rwanda",category:"Photography",year:"2026",image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85",description:"A photographic moment caught between the last light and the evening."}
];

const grid = document.getElementById("artGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const emptyState = document.getElementById("emptyState");
const savedCount = document.getElementById("savedCount");
let activeFilter = "All";
let saved = JSON.parse(localStorage.getItem("averos-saved") || "[]");
let savedOnly = false;

function updateSavedCount(){ savedCount.textContent = saved.length; }
function render(){
  const q = searchInput.value.trim().toLowerCase();
  const visible = artworks.filter(a => {
    const matchesCategory = activeFilter === "All" || a.category === activeFilter;
    const matchesQuery = [a.title,a.artist,a.place,a.category].join(" ").toLowerCase().includes(q);
    return matchesCategory && matchesQuery && (!savedOnly || saved.includes(a.id));
  });
  grid.innerHTML = visible.map(a => `
    <article class="art-card" data-id="${a.id}" tabindex="0" aria-label="View ${a.title} by ${a.artist}">
      <div class="art-image"><img src="${a.image}" alt="${a.title}" loading="lazy">
        <button class="save-button ${saved.includes(a.id) ? "saved" : ""}" data-save="${a.id}" aria-label="${saved.includes(a.id) ? "Remove saved artwork" : "Save artwork"}">${saved.includes(a.id) ? "♥" : "♡"}</button>
      </div>
      <div class="art-info"><div class="art-meta"><span>${a.category}</span><span>${a.year}</span></div><h3>${a.title}</h3><div class="artist-name">${a.artist} · ${a.place}</div></div>
    </article>`).join("");
  document.getElementById("resultCount").textContent = `${visible.length} ${visible.length === 1 ? "work" : "works"}`;
  emptyState.hidden = visible.length !== 0;
  grid.hidden = visible.length === 0;
  updateSavedCount();
}
function toggleSave(id){
  saved = saved.includes(id) ? saved.filter(x => x !== id) : [...saved,id];
  localStorage.setItem("averos-saved",JSON.stringify(saved));
  render();
}
filters.addEventListener("click",e=>{
  const btn=e.target.closest("[data-filter]"); if(!btn)return;
  activeFilter=btn.dataset.filter;
  filters.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));
  render();
});
searchInput.addEventListener("input",render);
document.getElementById("savedToggle").addEventListener("click",()=>{
  savedOnly=!savedOnly;
  document.getElementById("savedToggle").classList.toggle("active",savedOnly);
  document.getElementById("savedToggle").firstChild.textContent=savedOnly?"Showing saved ":"Saved ";
  render();
  document.getElementById("discover").scrollIntoView({behavior:"smooth"});
});
document.getElementById("clearSearch").addEventListener("click",()=>{
  searchInput.value=""; activeFilter="All"; savedOnly=false;
  filters.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter==="All"));
  render();
});
const dialog=document.getElementById("artDialog");
grid.addEventListener("click",e=>{
  const saveBtn=e.target.closest("[data-save]");
  if(saveBtn){e.stopPropagation();toggleSave(Number(saveBtn.dataset.save));return;}
  const card=e.target.closest("[data-id]"); if(!card)return;
  const a=artworks.find(x=>x.id===Number(card.dataset.id));
  document.getElementById("dialogContent").innerHTML=`<div class="dialog-layout"><img src="${a.image}" alt="${a.title}"><div class="dialog-copy"><p class="eyebrow">${a.category} · ${a.place}</p><h2>${a.title}</h2><strong>${a.artist}</strong><p>${a.description}</p><p>Interested in this artist's work? Send an enquiry to start a conversation.</p><a href="mailto:hello@averos.art?subject=${encodeURIComponent("Enquiry about "+a.title)}">Enquire about this work ↗</a></div></div>`;
  dialog.showModal();
});
grid.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches(".art-card")){e.preventDefault();e.target.click();}});
document.getElementById("dialogClose").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
document.getElementById("menuToggle").addEventListener("click",()=>{
  const nav=document.querySelector(".desktop-nav");const open=nav.classList.toggle("open");
  document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));
});
document.getElementById("year").textContent=new Date().getFullYear();
render();
