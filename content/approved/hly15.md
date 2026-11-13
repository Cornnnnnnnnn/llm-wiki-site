---
id: hly15
title: A hybrid immersed boundary and immersed interface method for electrohydrodynamic simulations
type: paper
subject: Computational Fluid Dynamics
tags: [immersed-interface-method, immersed-boundary-method, electrohydrodynamics, leaky-dielectric]
language: en
visibility: public
status: reviewed
summary: Structured reading notes on sharp electric-potential jumps, Maxwell interfacial stress, and an augmented IIM coupled to an IB fluid solver.
authors: [Wei-Fan Hu, Ming-Chih Lai, Yuan-Nan Young]
year: 2015
doi: 10.1016/j.jcp.2014.11.005
venue: Journal of Computational Physics 282, 47–61
source:
  kind: doi
  reference: 10.1016/j.jcp.2014.11.005
  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
related: []
---

## Citation

Wei-Fan Hu, Ming-Chih Lai, and Yuan-Nan Young (2015). *A hybrid immersed boundary and immersed interface method for electrohydrodynamic simulations*. Journal of Computational Physics **282**, 47–61. DOI: 10.1016/j.jcp.2014.11.005. Source: PDF p.1. The journal volume is dated 2015; the online-availability and copyright dates on the first page are 2014.

## Summary (AI-generated reading notes)

The paper computes drop dynamics under a DC electric field by combining IB for fluid motion with augmented IIM for electric potential. The central modeling choice is to apply the jump in Maxwell stress as an interfacial force rather than numerically differentiating a smoothed discontinuous stress tensor as a volume force. Source: PDF pp.1–4.

## Research problem

Electrical conductivity and permittivity jump across the fluid interface. Although potential is continuous, its gradient can be discontinuous, which makes electric-field and force accuracy near the interface important. The paper develops a sharp potential solver and couples the resulting electric force with capillary force in one IB fluid formulation. Source: PDF p.2.

## Assumptions and setting

- A neutrally buoyant, two-dimensional leaky-dielectric drop is immersed in another immiscible fluid under a DC electric field. Source: PDF p.2.
- The fluid densities and viscosities are matched; gravitational force is neglected. Conductivity and permittivity are piecewise constant and may differ across the interface. Source: PDF pp.2–3.
- Electric charge relaxation is fast relative to viscous fluid motion: $t_E=\varepsilon/\sigma\ll t_F=\rho L^2/\mu$. Source: PDF p.3.
- The interface is Lagrangian; a tangential redistribution velocity controls marker spacing. Source: PDF pp.1, 8–9.

## Methods

The potential is discretized at cell centers. Regular points use a standard five-point Laplacian; irregular points receive Taylor jump corrections. A normal-derivative jump becomes an augmented unknown, constrained by the conductivity-weighted flux condition. One-sided least-squares cubic interpolation approximates normal derivatives, and a Schur complement with GMRES reduces the augmented solve to interface unknowns with fast Poisson solves. Source: PDF pp.4–7.

The fluid equations use a projection method on a staggered MAC grid. The electric and capillary forces are spread from the Lagrangian interface to the Eulerian fluid grid. Source: PDF pp.8–9.

## Definitions and key equations

**Potential and jump conditions.** In the paper's leaky-dielectric approximation,

$$\mathbf E=-\nabla\phi,\qquad\nabla\cdot(\sigma\mathbf E)=0\quad\text{in }\Omega\setminus\Sigma,$$

$$[\phi]=0,\qquad[\sigma\nabla\phi\cdot\mathbf n]=0\quad\text{on }\Sigma.$$

The normal points from the minus side (drop interior) toward the plus side. With constant conductivity on each side, potential is harmonic within each fluid. Source: PDF p.3, Eqs.(6)–(7).

**Maxwell stress and its interfacial force.**

$$M_E=\varepsilon\left(\mathbf E\otimes\mathbf E-\frac12(\mathbf E\cdot\mathbf E)I\right),$$

$$\mathbf F_E=(M_E^+-M_E^-)\mathbf n,$$

$$\mathbf f_E(\mathbf x,t)=\int_\Sigma\mathbf F_E(s,t)\,\delta(\mathbf x-\mathbf X(s,t))\,|\mathbf X_s|\,ds.$$

Source: PDF p.4, Eqs.(8), (10), (11). The interface force and its Eulerian distribution are different quantities and have different integration measures.

**Generic augmented elliptic problem.**

$$\nabla\cdot(\sigma\nabla\phi)=f,\qquad[\phi]=v,\qquad[\sigma\phi_n]=w.$$

Introduce the unknown $g=[\phi_n]$ and solve the piecewise Poisson problem with this augmented jump. Source: PDF p.4, Eqs.(12)–(15).

## Main results reported by the authors

- Table 1 gives approximately second-order potential accuracy, with derivative convergence characterized by the authors as slightly below second order in their test. The rates vary across refinements and conductivity ratios. Source: PDF pp.6–7.
- The comparison with coefficient smoothing shows that resolving the potential gradient near a conductivity jump is important: the smoothed derivative does not converge in the displayed test. Source: PDF p.7, Table 2.
- The reported electric interfacial-force refinement test is roughly second order. Source: PDF pp.9–10, Figs.3–4.
- The fluid/interface results show better than first-order convergence in the tested example, despite the accuracy limitations potentially introduced by smoothing a singular IB force. Source: PDF p.10, Table 3 and accompanying discussion.
- Small-deformation and other numerical comparisons support the observed prolate/oblate behavior and flow patterns within the parameter regimes studied. Source: PDF pp.10–12. These notes do not claim new numerical reproduction.

## Limitations stated by the paper

The authors chiefly consider matching fluid density and viscosity. Tilted, non-axisymmetric deformation with viscosity contrast would require including surface charge convection and is left to future work. Small-deformation theory is a comparison regime, not an unrestricted prediction for large electric fields. Source: PDF pp.11–13, especially the discussion after Section 6 on PDF p.13.

