---
id: slice
title: Some old and new moving boundary problems for Hele-Shaw flow
type: digital-note
subject: Moving Boundary Problems
tags: [hele-shaw-flow, free-boundary, viscous-fingering, conformal-mapping, stability]
language: en
visibility: public
status: reviewed
summary: Reading notes on Scott McCue's 2019 slides covering classical Hele-Shaw geometries, control of viscous fingering, and doubly connected domains.
source:
  kind: citation
  reference: "Scott McCue, Some old and new moving boundary problems for Hele-Shaw flow, INI, 26 November 2019"
  pages: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 20, 21, 23, 24, 25, 26, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40]
related: []
---

## Source and document type

This file is a presentation, not a journal paper. The title slide identifies Scott McCue (Queensland University of Technology), with Liam Morrow, Michael Dallaston, and Timothy Moroney, and the occasion/date “INI, 26 Nov 2019”. Source: PDF p.1. These names are recorded as presented collaborators, not inferred as coauthors of every result cited in the slides.

There are **40 physical PDF pages but 30 numbered slides**, because several animation/overlay steps repeat a slide number. All references below use physical PDF page numbers.

## Summary (AI-generated reading notes)

The talk first reviews classical bubble, blob, and channel geometries, including conformal-map formulations and zero-surface-tension exact solutions. It then considers changing plate geometry, injection rate, rotation, and lifting to affect fingering instabilities, followed by moving boundaries in doubly connected domains. Source: PDF pp.2–14, 15–38.

## Research questions and setting

How do gap geometry, injection/extraction, surface tension, and rotation influence Hele-Shaw interface evolution? How can injection strategies reduce instability or control finger number? How do inner/outer interfaces interact in a doubly connected region? Source: PDF pp.15–16, 19–38.

The “fair test” in the control discussion fixes the injected fluid amount and time interval for comparing flow-rate schedules. Linear stability arguments and fully nonlinear simulations play different roles and should not be conflated. Source: PDF pp.17–18, 20–24, 39.

## Governing equations and key quantities

For the constant-gap configuration, the Darcy-type velocity and conservation equations on physical PDF p.3 are

$$\mathbf q=-\frac{b^2}{12\mu}\nabla p,\qquad\nabla\cdot\mathbf q=0\quad\Longrightarrow\quad\nabla^2p=0\text{ in }\Omega(t).$$

The pressure and normal-velocity conditions on the interface are

$$p=-\gamma\kappa,\qquad v_n=-\frac{b^2}{12\mu}\frac{\partial p}{\partial n}.$$

Here $b$ is plate gap and $\mu$ viscosity. The source uses $\gamma$ for surface tension.

When the gap depends on position and time, the conservation equation changes to

$$\nabla\cdot(b\mathbf q)=-\frac{\partial b}{\partial t}.$$

Source: PDF p.16 (numbered slide 11). Consequently, the constant-gap harmonic-pressure model cannot simply be reused without changing the equations.

The shape comparisons use an isoperimetric ratio

$$I(t)=\frac{L^2}{4\pi A},$$

and a maximum-to-minimum radial extent measure. Source: PDF pp.23–24 (numbered slide 16). The slide also denotes the latter by $A(t)$; do not confuse it with the area $A$ in the ratio above.

## Methods and organization

- Classical configurations and conformal mappings: PDF pp.3–10. The zero-surface-tension blob example develops a polynomial conformal map and a cusp when its critical point reaches the unit circle. These formulas describe a particular example, not every Hele-Shaw geometry.
- Nonzero surface tension and resulting shape patterns: PDF pp.11–13.
- Standard, tapered, rotating, and lifting cells: PDF pp.15–31. Stability calculations motivate controlled injection schedules and choices of time-varying gap.
- Doubly connected domains: PDF pp.32–38. Inner and outer pressure conditions, annulus mappings, and numerical interface evolution are considered.
- The concluding slide identifies the level-set method for fully nonlinear numerical simulations. Source: PDF p.39.

## Results presented in the slides

The talk displays numerical comparisons of constant, linear, and optimized injection for standard and nonstandard cells. It also illustrates using injection and a time-dependent gap to control finger number. These are scenario-specific comparisons rather than a universal guarantee that a chosen schedule prevents all fingering. Source: PDF pp.17–31, 39.

The doubly connected examples examine pressure difference, inner/outer radii, and rotation. A time-to-bursting comparison with an experimentally reported power law is shown; the slide quotes an exponent near $-1.21$. This is a reported comparison, not a newly fitted exponent in these notes. Source: PDF pp.33–38, particularly p.36.

## Citation leads recorded in the source

The last slide cites L. C. Morrow, T. J. Moroney, and S. W. McCue (2019), *Numerical investigation of controlling interfacial instabilities in non-standard Hele-Shaw configurations*, JFM **877**, 1063–1097. Source: PDF p.40. No DOI is invented, and this presentation is not relabeled as that journal paper.

