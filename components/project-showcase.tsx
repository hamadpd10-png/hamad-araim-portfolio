'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';

const projects = [
 {id:'autofetch',title:'AutoFetch',subtitle:'Wheelchair-mounted ball launcher.',image:'p3-18',result:'21 ft',resultLabel:'Maximum recorded travel',role:'Concept exploration, test planning, and project coordination.',
  summary:'An assistive launcher designed to let a wheelchair user play fetch with less hand movement. The team developed an enclosed flywheel mechanism with remote activation.',
  contribution:'I developed launcher and grab-tool concepts, refined the testing plan, and managed milestones and the project schedule.',
  outcome:'The team prototype reached 21 ft total travel (6 ft to the first bounce). Nine of ten survey participants rated ease of use 4 or 5 out of 5.',
  limitation:'Next step: a smaller base, stronger motors, and more durability testing.',
  images:[['p3-18','Final CAD assembly','Team design'],['p3-6','Working prototype','Team build'],['p3-48','Launcher concept','My sketch'],['p3-20','Exploded drawing','Team design']]},
 {id:'gripper',title:'Robotic Gripper',subtitle:'Single-servo robotic end effector.',image:'p1-97',result:'2:1',resultLabel:'Gear reduction',role:'Concept sketches, CAD modelling, and function planning.',
  summary:'A compact Q-Arm attachment designed to pick up and release different object shapes using one servo and three printed mechanism parts.',
  contribution:'I sketched and modelled gripper concepts in CAD and planned the customer_summary() function with an individual flowchart.',
  outcome:'The team combined a 2:1 gear ratio with sponge contact pads to improve grip. Testing handled the reported objects except the level 4 set.',
  limitation:'Next step: improve pad attachment and reduce gear-fit friction.',
  images:[['p1-97','Final CAD assembly','Team design'],['p1-8','Object-handling test','Team testing'],['p1-52','Individual CAD concept','My CAD model'],['p1-53','Customer-summary flowchart','My function planning']]}
] as const;

function Mechanism({kind}:{kind:string}) {
 const [opening,setOpening]=useState(65);
 const [shot,setShot]=useState(0);
 const [running,setRunning]=useState(false);
 const [view,setView]=useState<'mechanism'|'cad'>('mechanism');
 const [angle,setAngle]=useState(0);
 useEffect(()=>{if(!running)return;const timer=setTimeout(()=>setRunning(false),1500);return ()=>clearTimeout(timer)},[running]);
 const launcher=kind==='autofetch';
 return <div className="mechanism">
  <div className="demo-toolbar"><span>Explore the mechanism</span><div className="view-toggle" aria-label="Display mode"><button aria-pressed={view==='mechanism'} onClick={()=>setView('mechanism')}>Interactive</button><button aria-pressed={view==='cad'} onClick={()=>setView('cad')}>Actual CAD</button></div></div>
  {view==='cad'?<div className="demo-cad"><img src={launcher?'/projects/p3-18.webp':'/projects/p1-97.webp'} alt={launcher?'Actual team AutoFetch CAD assembly':'Actual team robotic gripper CAD assembly'}/></div>:
  <div className="demo-canvas">
   {launcher?<svg viewBox="0 0 660 330" role="img" aria-label="Illustration of counter-rotating flywheels launching a ball. Adjust the direction and press Launch.">
    <defs><pattern id="launcher-grid" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#dedee2"/></pattern></defs>
    <rect width="660" height="330" fill="url(#launcher-grid)"/>
    <path d="M72 267H588" stroke="#d3d3d8" strokeWidth="1"/>
    <g transform={`translate(215 165) rotate(${-angle})`}>
     <rect x="-114" y="-86" width="180" height="172" rx="28" fill="#fff" stroke="#aaaab0" strokeWidth="1.5"/>
     <path d="M-95 0H52" stroke="#e7e7eb" strokeWidth="36"/>
     <path d="M-95 -20H50M-95 20H50" stroke="#b5b5bb" fill="none"/>
     {[-49,49].map((y,i)=><g key={y} transform={`translate(0 ${y})`}><g className={running?'flywheel spinning':''} style={{animationDirection:i?'reverse':'normal'}}><circle r="39" fill="#29292d"/><circle r="29" fill="none" stroke="#77777f" strokeWidth="1.5"/>{[0,60,120].map(a=><path key={a} transform={`rotate(${a})`} d="M-25 0H25" stroke="#d0d0d5" strokeWidth="2"/>)}<circle r="8" fill="#f5f5f7"/></g></g>)}
     <path d="M65 0H330" stroke="#b5b5bb" strokeDasharray="4 8"/>
     <path d="M320 -6L330 0L320 6" fill="none" stroke="#b5b5bb"/>
     <circle key={shot} className={running?'demo-ball launched':'demo-ball'} cx="-78" cy="0" r="12" fill="#fff" stroke="#1d1d1f" strokeWidth="2" onAnimationEnd={()=>setRunning(false)}/>
    </g>
    <text x="215" y="303" textAnchor="middle" fill="#6e6e73" fontSize="12">Counter-rotating flywheels</text>
   </svg>:<svg viewBox="0 0 660 330" role="img" aria-label={`Illustrated gripper, ${opening}% open. Use the slider to open and close the jaws.`}>
    <defs><pattern id="gripper-grid" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#dedee2"/></pattern></defs>
    <rect width="660" height="330" fill="url(#gripper-grid)"/>
    <rect x="269" y="230" width="122" height="56" rx="12" fill="#e8e8ec" stroke="#b5b5bb"/>
    <circle cx="330" cy="236" r="21" fill="#29292d"/>
    <g transform={`translate(280 199) rotate(${-opening*.32})`}><path d="M0 0L-24 -51L-24 -119L10 -119" fill="none" stroke="#29292d" strokeWidth="17" strokeLinejoin="round"/><path d="M10 -120V-91" stroke="#a3a3ab" strokeWidth="10"/><circle r="40" fill="#fff" stroke="#29292d" strokeWidth="8" strokeDasharray="7 4"/><circle r="10" fill="#29292d"/></g>
    <g transform={`translate(380 199) rotate(${opening*.32})`}><path d="M0 0L24 -51L24 -119L-10 -119" fill="none" stroke="#29292d" strokeWidth="17" strokeLinejoin="round"/><path d="M-10 -120V-91" stroke="#a3a3ab" strokeWidth="10"/><circle r="40" fill="#fff" stroke="#29292d" strokeWidth="8" strokeDasharray="7 4"/><circle r="10" fill="#29292d"/></g>
    <path d="M315 236H345" stroke="#fff" strokeWidth="2" transform={`rotate(${opening*.64} 330 236)`}/>
    <text x="330" y="311" textAnchor="middle" fill="#6e6e73" fontSize="12">One servo · paired jaws</text>
   </svg>}
  </div>}
  {view==='mechanism'&&<div className="demo-controls">
   <label htmlFor={`control-${kind}`}>{launcher?'Aim':'Jaw opening'}<span>{launcher?`${angle}°`:`${opening}%`}</span><input id={`control-${kind}`} type="range" min="0" max={launcher?25:100} value={launcher?angle:opening} onChange={e=>launcher?setAngle(Number(e.target.value)):setOpening(Number(e.target.value))}/></label>
   {launcher?<button className="demo-action" disabled={running} onClick={()=>{setShot(shot+1);setRunning(true)}}><Play size={15}/>{running?'Launching':'Launch'}</button>:<button className="demo-action" onClick={()=>setOpening(opening===0?85:0)}><RotateCcw size={15}/>{opening===0?'Open':'Close'}</button>}
  </div>}
  <p className="demo-note">{view==='mechanism'?'Illustrative motion study · not a physics simulation or measured geometry.':'Original CAD from the team project report.'}</p>
 </div>;
}

function ProjectDetails({project}:{project:typeof projects[number]}) {
 const [image,setImage]=useState(0);
 const [section,setSection]=useState<'demo'|'evidence'>('demo');
 const selected=project.images[image];
 return <>
  <div className="project-popup-heading"><DialogTitle>{project.title}</DialogTitle><DialogDescription>{project.subtitle}</DialogDescription></div>
  <div className="detail-tabs" role="group" aria-label="Project view"><button aria-pressed={section==='demo'} onClick={()=>setSection('demo')}>How it works</button><button aria-pressed={section==='evidence'} onClick={()=>setSection('evidence')}>Project images</button></div>
  {section==='demo'?<Mechanism kind={project.id}/>:<div className="evidence-view"><img src={`/projects/${selected[0]}.webp`} alt={selected[1]}/><div className="evidence-caption"><button aria-label="Previous image" onClick={()=>setImage((image+project.images.length-1)%project.images.length)}><ArrowLeft size={18}/></button><span>{selected[1]}<small>{selected[2]} · {image+1} / {project.images.length}</small></span><button aria-label="Next image" onClick={()=>setImage((image+1)%project.images.length)}><ArrowRight size={18}/></button></div></div>}
  <div className="project-brief"><p>{project.summary}</p><div><h3>My contribution</h3><p>{project.contribution}</p></div><div><h3>Team results</h3><p>{project.outcome}</p><p className="project-limitation">{project.limitation}</p></div></div>
 </>;
}

export default function ProjectShowcase(){
 return <div className="showcase-grid">{projects.map(project=><Dialog key={project.id}><article className="showcase-card">
  <DialogTrigger className="showcase-open" aria-label={`Explore ${project.title}`}>
   <div className="showcase-image"><img src={`/projects/${project.image}.webp`} alt={`${project.title} team CAD assembly`} loading="lazy"/><span className="explore-badge">Explore <ArrowUpRight size={16}/></span></div>
   <div className="showcase-copy"><h3>{project.title}</h3><p>{project.subtitle}</p><div className="showcase-result"><strong>{project.result}</strong><span>{project.resultLabel}<small>Team result</small></span></div></div>
  </DialogTrigger>
 </article><DialogContent className="project-popup"><ProjectDetails project={project}/></DialogContent></Dialog>)}</div>;
}
