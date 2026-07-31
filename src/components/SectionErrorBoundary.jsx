"use client";
import { Component } from 'react';

/**
 * Keeps one failing section from taking down the whole page.
 *
 * The 3D showcase pulls an HDR environment map from an external CDN. When that
 * request fails (blocked, offline, ad blocker) it throws during render, and
 * with no boundary in the tree React tears down every client component on the
 * page. That is what left the stat counters frozen at their server-rendered
 * zeros. Anything optional and network-dependent belongs behind this.
 */
class SectionErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Section failed to render:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default SectionErrorBoundary;
