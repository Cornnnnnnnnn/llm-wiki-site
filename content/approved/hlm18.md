---
id: hlm18
title: A coupled immersed boundary and immersed interface method for interfacial flows with soluble surfactant
type: paper
subject: Computational Fluid Dynamics
tags: [immersed-interface-method, immersed-boundary-method, soluble-surfactant, convection-diffusion]
language: en
visibility: public
status: reviewed
summary: Reading notes on a coupled IB–IIM scheme for surface–bulk surfactant transport and droplet dynamics, separating fixed-domain and moving-domain accuracy results.
authors: [Wei-Fan Hu, Ming-Chih Lai, Chaouqi Misbah]
year: 2018
doi: 10.1016/j.compfluid.2018.04.013
venue: Computers and Fluids 168, 201–215
source:
  kind: doi
  reference: 10.1016/j.compfluid.2018.04.013
  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
related: []
---

## Citation

Wei-Fan Hu, Ming-Chih Lai, and Chaouqi Misbah (2018). *A coupled immersed boundary and immersed interface method for interfacial flows with soluble surfactant*. Computers and Fluids **168**, 201–215. DOI: 10.1016/j.compfluid.2018.04.013. Source: PDF p.1, printed p.201.

## Summary (AI-generated reading notes)

The paper couples an immersed-boundary fluid solver to a sharp immersed-interface solver for bulk surfactant concentration. Its numerical development proceeds from diffusion in a fixed irregular domain to convection–diffusion in an evolving domain, then to coupled surface–bulk transport and droplet deformation in shear flow. The aim is to retain concentration jumps at the interface instead of smoothing them across a transition layer. Source: PDF pp.1–2, 14.

## Research problem

Soluble surfactant can move between a bulk fluid and a deforming interface by adsorption and desorption. This couples transport in an irregular moving region, transport on the interface, surface tension, and fluid motion. The paper asks how to solve these components efficiently on a regular Cartesian grid while preserving the sharp concentration discontinuity. Source: PDF pp.1–2, 8–9.

## Assumptions and setting

- The computational setting is two-dimensional, with a closed Lagrangian interface inside a rectangular Eulerian domain. The basic diffusion construction initially assumes a fixed interface. Source: PDF p.2.
- The physical bulk concentration is solved outside the drop; its extension inside the drop is set to zero, turning the inner boundary condition into jump conditions. Source: PDF pp.2, 5.
- For the coupled flow examples, the two fluids have matching density and viscosity, and gravity is neglected. The droplet is driven by shear flow. Source: PDF pp.8–9.
- Dirichlet, Neumann, and Robin inner boundary conditions are tested for the model transport solvers. These are distinct test settings, not simultaneous conditions imposed on one solution. Source: PDF pp.2, 4–5, 8.

## Methods

At regular grid points the standard five-point Laplacian is retained. At irregular points, Taylor expansions along the interface normal supply corrections from jump data. Fourier representation of the closed interface provides derivatives and interpolation of geometric quantities. A least-squares cubic polynomial provides a one-sided interface value or normal derivative. Source: PDF pp.3–4.

Backward Euler (BE) and Crank–Nicolson (CN) are provided for fixed-domain diffusion. An augmented interface system is reduced with a Schur complement; GMRES requires matrix–vector operations and repeated fast Poisson/Helmholtz solves rather than explicitly constructing inverse matrices. Source: PDF pp.3–4.

The moving-domain method splits convection and diffusion and treats interface crossings using jump information. The full fluid algorithm uses a staggered MAC grid, a pressure-increment projection solver, Lagrangian markers, surface transport, and the IIM bulk solver. Source: PDF pp.5–7, 9.

## Definitions and key equations

**Diffusion and domain extension.** With the concentration extended as zero in the interior,

$$\partial_t\phi=\frac1{Pe}\Delta\phi,\qquad [\phi]=\phi^+,\qquad[\phi_n]=\phi_n^+.$$

The normal points from the interior to the exterior; the jumps represent the plus-side value minus the minus-side value. Source: PDF p.2, Eqs.(1)–(3).

**Augmented system.** In the notation of the paper,

$$\begin{bmatrix}H&C\\B&-I\end{bmatrix}\begin{bmatrix}\Phi^{n+1}\\\Psi_1^{n+1}\end{bmatrix}=\begin{bmatrix}F\\0\end{bmatrix},$$

$$\left(BH^{-1}C+I\right)\Psi_1^{n+1}=BH^{-1}F.$$

Here $\Psi_1$ is the vector of solution jumps at the Lagrangian markers, and $B$ represents one-sided interpolation. Source: PDF pp.3–4, Eq.(12) and its elimination.

**Moving bulk transport.**

$$\partial_t\phi+\mathbf u\cdot\nabla\phi=\frac1{Pe}\Delta\phi.$$

The coupled surfactant model prescribes its interface flux through adsorption/desorption and evolves surface concentration as well. The same exchange bracket appears in the bulk boundary condition and surface source; the bulk and surface equations must not be treated independently. Source: PDF p.5, Eq.(14); p.9, Eqs.(26)–(27).

**Surface tension.** The nondimensional Langmuir equation of state is

$$\sigma=1+El\ln\!\left(\frac{1-\chi\Gamma}{1-\chi}\right).$$

Here $\Gamma$ is surface concentration, $El$ the elasticity number, and $\chi$ the equilibrium coverage fraction. Source: PDF pp.8–9, Eq.(25). The variables in this equation are not the interface curve denoted $\Sigma$.

## Main results reported by the authors

- In the fixed-domain manufactured-solution tests with $\Delta t=h$, BE shows approximately first-order global error and CN approximately second-order error. These results are reported separately in Table 1; they are not a blanket second-order statement for the full coupled method. Source: PDF p.5, printed p.205.
- The moving-domain transport tests in Table 2 show approximately first-order error for the stated splitting method and boundary conditions. Source: PDF p.8, printed p.208.
- Parameter studies explore the effect of Biot number and bulk Peclet number on deformation and surfactant distribution. Source: PDF pp.10–14. No new measurements or numerical reproductions were performed for these notes.
- The paper checks total surfactant conservation under suitable boundary conditions. Source: PDF p.9 and subsequent numerical studies. A symbolic conservation identity is not by itself a proof that every discrete implementation conserves mass exactly.

## Limitations and future work

The results concern the stated two-dimensional model and numerical tests. Three-dimensional axisymmetric or fully 3D simulations and phoretic self-propulsion are listed as future work, not completed demonstrations. One-sided fitting near high curvature needs sufficient same-side grid points. Source: PDF p.4; conclusions, PDF p.14.

