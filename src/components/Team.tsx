"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import styles from "./Team.module.css";

const FOUNDERS = [
  {
    name: "Surekha Gariganti",
    role: "CEO / Founder",
    displayHeading: "visionary founder.",
    tagline: "A hands on strategist & design creative, with a passion for the details.",
    bio: "Surekha has been responsible for bringing concepts to life for some of the world's most exciting and forward thinking brands. Outside of work she can be found watching her favourite sports.",
    image: "/ceo1.jpeg",
  },
  {
    name: "Hema Chandhu",
    role: "Managing Director / COO",
    displayHeading: "operations mastermind.",
    tagline: "Driving excellence through streamlined systems and innovative growth.",
    bio: "Hema leads Panacea’s day-to-day operations with a sharp eye for process, people, and performance. He turns strategy into systems that scale — keeping delivery sharp, teams aligned, and growth sustainable.",
    image: "/ceo2.jpeg",
  },
];

const TEAM = [
  { name: "Dharsan", role: "Lead UI/UX Designer", image: "/dharsan.jpeg" },
  { name: "PavanKalyan", role: "Digital Marketing Manager", image: "/pavan.jpeg" },
  { name: "Deekshith", role: "Senior Frontend Lead", image: "/deekshith.jpeg" },
  { name: "Harika", role: "Mobile App Developer", image: "/harika.jpeg" },
  { name: "Varun", role: "DevOps Architect", image: "/varun.jpeg" },
  { name: "Vinayaraj", role: "AI/ML Specialist", image: "/vinayaraj.jpeg" },
  { name: "Karthik", role: "software developer", image: "/karthik1.jpeg" },
  { name: "Akshitha", role: "software developer", image: "/akshitha.jpeg" },
  { name: "Akhila", role: "software developer", image: "/akhila.jpeg" },
  { name: "Kranthi", role: "software developer", image: "/kranthi.jpeg" },
];

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

function FounderRow({
  founder,
  index,
  reduced,
}: {
  founder: (typeof FOUNDERS)[number];
  index: number;
  reduced: boolean;
}) {
  const reverse = index % 2 !== 0;

  return (
    <motion.article
      className={`${styles.founder} ${reverse ? styles.founderReverse : ""}`}
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.7, ease, delay: reduced ? 0 : index * 0.08 }}
    >
      <div className={styles.founderMedia}>
        <span className={styles.founderGlow} aria-hidden />
        <div className={styles.founderFrame}>
          <img src={founder.image} alt={founder.name} className={styles.founderImg} />
        </div>
      </div>

      <div className={styles.founderCopy}>
        <motion.p
          className={styles.founderRole}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1, ease }}
        >
          {founder.role}
        </motion.p>
        <motion.p
          className={styles.founderName}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.16, ease }}
        >
          {founder.name}
        </motion.p>
        <motion.h3
          className={styles.founderTitle}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          {founder.displayHeading}
        </motion.h3>
        <motion.p
          className={styles.founderTag}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.26, ease }}
        >
          {founder.tagline}
        </motion.p>
        <motion.p
          className={styles.founderBio}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.32, ease }}
        >
          {founder.bio}
        </motion.p>
      </div>
    </motion.article>
  );
}

export default function CyanQuantumTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="team"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="digital-architects-heading"
    >
      <div className={styles.bg} aria-hidden>
        <div className={styles.noise} />
        <div className={styles.archGrid} />
        <div className={styles.perspectiveFloor} />
        <div className={styles.scanLine} />
        <div className={styles.glowA} />
        <div className={styles.glowB} />
        <div className={styles.geoFrame} />
        <span className={`${styles.node} ${styles.nodeA}`} />
        <span className={`${styles.node} ${styles.nodeB}`} />
        <span className={`${styles.node} ${styles.nodeC}`} />
        <span className={`${styles.node} ${styles.nodeD}`} />
        <span className={`${styles.connector} ${styles.connectorA}`} />
        <span className={`${styles.connector} ${styles.connectorB}`} />
        <span className={`${styles.connector} ${styles.connectorC}`} />
      </div>

      <div className={styles.wrap}>
        <div className={styles.intro}>
          <div>
            <motion.span
              className={styles.eyebrow}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
            >
              <Cpu size={14} />
              <span className={styles.eyebrowDot} aria-hidden />
              Integrated Network
            </motion.span>

            <h2 id="digital-architects-heading" className={styles.heading}>
              <motion.span
                className={styles.headingLine}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.08, ease }}
              >
                The Digital
              </motion.span>
              <motion.span
                className={styles.headingAccent}
                initial={reduced ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: reduced ? 0 : 0.18, ease }}
              >
                Architects.
              </motion.span>
            </h2>
          </div>

          <div>
            <motion.p
              className={styles.lede}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: reduced ? 0 : 0.22, ease }}
            >
              The studio behind the systems — strategists, engineers, and designers building digital
              products with precision, structure, and intent.
            </motion.p>

            <motion.div
              className={styles.stats}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: reduced ? 0 : 0.32, ease }}
            >
              <div className={styles.stat}>
                <span className={styles.statNum}>02</span>
                <span className={styles.statLabel}>Founders</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>{String(TEAM.length).padStart(2, "0")}</span>
                <span className={styles.statLabel}>Specialists</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>01</span>
                <span className={styles.statLabel}>Studio</span>
              </div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: reduced ? 0 : 0.4, ease }}
            >
              <Link href="/contact" className={styles.cta}>
                Work with the studio
                <ArrowRight size={15} className={styles.ctaArrow} aria-hidden />
              </Link>
            </motion.div>
          </div>
        </div>

        <div className={styles.founders}>
          {FOUNDERS.map((founder, index) => (
            <FounderRow key={founder.name} founder={founder} index={index} reduced={reduced} />
          ))}
        </div>

        <div className={styles.specialistsHead}>
          <h3 className={styles.specialistsTitle}>Core Specialists</h3>
          <span className={styles.specialistsRule} aria-hidden />
        </div>

        <div className={styles.grid}>
          {TEAM.map((member, i) => (
            <motion.article
              key={member.name}
              className={styles.member}
              variants={fadeUp}
              initial={reduced ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: reduced ? 0 : i * 0.04 }}
            >
              <div className={styles.memberFrame}>
                <img src={member.image} className={styles.memberImg} alt={member.name} />
                <span className={styles.memberShade} aria-hidden />
              </div>
              <h4 className={styles.memberName}>{member.name}</h4>
              <p className={styles.memberRole}>{member.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
