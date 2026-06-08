import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const img = (name) => `${import.meta.env.BASE_URL}assets/images/${name}`;

const products = [
  {
    slug: 'dgw200ms-ukv',
    name: 'DGW200MS/UKV',
    type: 'Diesel Welder',
    partNo: '123456',
    category: 'Diesel Welders',
    image: img('product-dgw200.png'),
    gallery: [img('product-dgw200.png'), img('product-machine-back.png'), img('product-panel.jpg')],
    specs: [
      ['Welding Current (A)', '200'],
      ['Power Output (kVA)', '3.3'],
      ['Duty Cycle (%)', '50'],
      ['Dry Weight (kg)', '434'],
    ],
    details: 'Compact diesel-powered welder generator designed for mobile repair teams, rail service, and remote field work.',
  },
  {
    slug: 'egw165m-ukv',
    name: 'EGW165M-I/UKV',
    type: 'Petrol Welder Generator',
    partNo: '123456',
    category: 'Welder Generators',
    image: img('product-egw165.png'),
    gallery: [img('product-egw165.png'), img('category-diesel.jpg'), img('hero-sparks.jpg')],
    specs: [
      ['Welding Current (A)', '165'],
      ['Power Output (kVA)', '3.2'],
      ['Dry Weight (kg)', '88'],
      ['Fuel Tank (L)', '15'],
    ],
    details: 'Portable petrol welder generator for light construction jobs, service vans, and quick site repairs.',
  },
  {
    slug: 'dgw300ms-ukv',
    name: 'DGW300MS/UKV',
    type: 'Diesel Welder',
    partNo: '123456',
    category: 'Diesel Welders',
    image: img('product-dgw300.png'),
    gallery: [img('product-dgw300.png'), img('product-machine-back.png'), img('product-panel.jpg')],
    specs: [
      ['Welding Current (A)', '300'],
      ['Power Output (kVA)', '3.3'],
      ['Duty Cycle (%)', '60'],
      ['Fuel Tank (L)', '37'],
    ],
    details: 'Diesel-powered welder generator for construction, maintenance, fabrication, and demanding industrial use.',
  },
  {
    slug: 'dgw320m-i-ukv',
    name: 'DGW320M-I/UKV',
    type: 'Diesel Welder',
    partNo: '123456',
    category: 'Diesel Welders',
    image: img('product-dgw320.png'),
    gallery: [img('product-dgw320.png'), img('product-dgw300.png'), img('product-machine-back.png')],
    specs: [
      ['Welding Current (A)', '270'],
      ['Power Output (kVA)', '14'],
      ['Duty Cycle (%)', '100'],
      ['Engine Type', 'Water-cooled diesel'],
    ],
    details: 'High duty-cycle diesel welder built for continuous professional field operation.',
  },
  {
    slug: 'dgw400dml-ukv',
    name: 'DGW400DML/UKV',
    type: 'Diesel Welder',
    partNo: '123456',
    category: 'Diesel Welders',
    image: img('product-dgw400.png'),
    gallery: [img('product-dgw400.png'), img('product-dgw320.png'), img('product-panel.jpg')],
    specs: [
      ['Welding Current (A)', '400'],
      ['Power Output (kVA)', '9'],
      ['Duty Cycle (%)', '50'],
      ['Mode', 'Dual operator'],
    ],
    details: 'Heavy-duty industrial welder generator for high-output welding in infrastructure and energy projects.',
  },
  {
    slug: 'dg15bmk-ukv',
    name: 'DG15BMK/UKV',
    type: 'Diesel Generator',
    partNo: '123456',
    category: 'Diesel Generators',
    image: img('product-dg15.png'),
    gallery: [img('product-dg15.png'), img('product-machine-back.png'), img('category-diesel.jpg')],
    specs: [
      ['Power Output (kVA)', '10.4'],
      ['Phase', '1 & 3'],
      ['Fuel Tank (L)', '37'],
      ['Noise Level', 'Low-noise canopy'],
    ],
    details: 'Reliable compact diesel generator for workshops, temporary power, and backup applications.',
  },
];

const categories = [
  { title: 'Welder Generators', image: img('category-welder.png'), filter: 'Welder Generators' },
  { title: 'Diesel Generators', image: img('category-diesel.jpg'), filter: 'Diesel Generators' },
  { title: 'Diesel Welders', image: img('product-machine-back.png'), filter: 'Diesel Welders' },
  { title: 'Related Products', image: img('category-related.jpg'), filter: 'all' },
];

const news = [
  { slug: 'pipeline-maintenance', title: 'Pipeline maintenance equipment for field teams', image: img('news-1.jpg'), tag: 'Rail & Pipeline', text: 'Reliable diesel welder generators help service teams operate away from stationary power sources.' },
  { slug: 'industrial-fleet', title: 'How industrial fleets reduce downtime', image: img('news-2.jpg'), tag: 'Service', text: 'Choosing the right spare parts strategy keeps welding equipment ready for demanding environments.' },
  { slug: 'mobile-power', title: 'Mobile power for construction sites', image: img('news-3.jpg'), tag: 'Equipment', text: 'Compact Japanese generators support construction crews, contractors, and maintenance groups.' },
  { slug: 'site-repair', title: 'Welding units for remote site repairs', image: img('news-4.jpg'), tag: 'Field Work', text: 'The right diesel welder allows operators to react quickly without waiting for grid access.' },
  { slug: 'generator-selection', title: 'Generator selection guide for Europe', image: img('news-5.jpg'), tag: 'Guide', text: 'Output, duty cycle, fuel tank and service availability should be reviewed before purchase.' },
  { slug: 'safety-and-productivity', title: 'Safety and productivity in harsh locations', image: img('news-6.jpg'), tag: 'Insights', text: 'Ergonomic controls and stable output are key for long shifts in industrial locations.' },
];

const serviceCards = [
  { title: 'Petro-Chemical', image: img('petrochemical.png'), text: 'Stable output for refineries, pipework and long-running maintenance work.' },
  { title: 'Offshore', image: img('offshore.jpg'), text: 'Rugged power solutions for challenging coastal and industrial environments.' },
  { title: 'Rail', image: img('rail.jpg'), text: 'Equipment for rail maintenance, repair teams and mobile infrastructure crews.' },
  { title: 'Rental', image: img('rental.png'), text: 'Reliable machines for rental fleets, contractors and temporary site power.' },
];

const features = ['Built for extremes', 'Stage V compliant', 'Lower operating cost', 'Dual-operator productivity', 'Service confidence'];

function useHashRoute() {
  const get = () => window.location.hash.replace(/^#/, '') || '/';
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const onChange = () => setRoute(get());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

function useRequestList() {
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('feroxo-request-list') || '[]'); }
    catch { return []; }
  });
  useEffect(() => localStorage.setItem('feroxo-request-list', JSON.stringify(list)), [list]);
  const add = (product) => setList((prev) => prev.some((p) => p.slug === product.slug) ? prev : [...prev, product]);
  const remove = (slug) => setList((prev) => prev.filter((p) => p.slug !== slug));
  const clear = () => setList([]);
  return { list, add, remove, clear };
}

function App() {
  const route = useHashRoute();
  const request = useRequestList();
  const [modal, setModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const current = route.split('/').filter(Boolean);
  let page = <Home request={request} openRequest={() => setModal(true)} />;
  if (current[0] === 'products' && current[1]) page = <ProductDetail slug={current[1]} request={request} openRequest={() => setModal(true)} />;
  else if (current[0] === 'products') page = <Products request={request} openRequest={() => setModal(true)} />;
  else if (current[0] === 'service') page = <Service request={request} openRequest={() => setModal(true)} />;
  else if (current[0] === 'news' && current[1]) page = <NewsDetail slug={current[1]} />;
  else if (current[0] === 'news') page = <News />;
  else if (current[0] === 'contact') page = <Contact request={request} openRequest={() => setModal(true)} />;
  else if (current[0] === 'about') page = <About />;
  else if (current[0] === 'request') page = <RequestPage request={request} />;

  return (
    <>
      <Header route={route} count={request.list.length} openRequest={() => setModal(true)} menu={menu} setMenu={setMenu} />
      <main onClick={() => menu && setMenu(false)}>{page}</main>
      <Footer />
      {modal && <RequestModal request={request} onClose={() => setModal(false)} />}
    </>
  );
}

function Header({ route, count, openRequest, menu, setMenu }) {
  const links = [
    ['/', 'Home'], ['/about', 'About Us'], ['/products', 'Products'], ['/service', 'Service'], ['/news', 'News'], ['/contact', 'Contact'],
  ];
  return (
    <header className="site-header">
      <div className="header-side" />
      <a className="logo" href="#/" aria-label="Feroxo home"><span>Feroxo</span></a>
      <nav className={menu ? 'open' : ''} aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <a key={href} className={isActive(route, href) ? 'active' : ''} href={`#${href}`}>{label}</a>
        ))}
      </nav>
      <div className="header-actions">
        <button className="icon-btn" title="Language">◎</button>
        <button className="primary small" onClick={openRequest}>Make Request {count > 0 && <b>{count}</b>}</button>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Open menu"><span /><span /><span /></button>
      </div>
      <div className="header-side right" />
    </header>
  );
}

function isActive(route, href) {
  if (href === '/') return route === '/';
  return route.startsWith(href);
}

function Shell({ title, children, compact = false }) {
  return (
    <section className={`page-shell ${compact ? 'compact' : ''}`}>
      <div className="big-red-title"><h1>{title}</h1></div>
      {children}
    </section>
  );
}

function Home({ request, openRequest }) {
  const [slide, setSlide] = useState(0);
  const shownNews = useMemo(() => news.slice(slide, slide + 3).concat(news.slice(0, Math.max(0, slide + 3 - news.length))), [slide]);
  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `linear-gradient(90deg, rgba(60, 15, 22, .82), rgba(60, 15, 22, .72)), url(${img('hero-welding.jpg')})` }} />
        <div className="hero-topline">Stage V-Compliant<br />Uncompromising reliability<br />for Europe</div>
        <div className="guarantee"><strong>3 YEARS</strong><span>guaranteed</span></div>
        <div className="hero-copy">
          <p>Engineered for<br /><b>pipeline construction & rail</b><br />extreme environments</p>
          <h1>Japanese<br />Power</h1>
        </div>
      </section>

      <section className="strengths grid-container">
        <article className="image-card japan-card">
          <img src={img('engineered-japan.jpg')} alt="Shindaiwa welding generator panel" />
          <div><h3>Engineered in Japan</h3><p>Proven Shindaiwa engineering principles for professional field applications.</p></div>
        </article>
        <div className="strength-pills">
          {features.map((item) => <span key={item}>{item}</span>)}
        </div>
        <h2 className="vertical-title">Strengths</h2>
      </section>

      <section className="industry-callout grid-container">
        <div className="white-box cut-box">
          <h2>Built for<br />Industry</h2>
          <p>From advanced welding systems to reliable diesel generators — find equipment tailored for modern industrial operations.</p>
          <a className="primary" href="#/products">See Equipment</a>
        </div>
        <VideoCard image={img('field-pipeline.png')} />
      </section>

      <section className="news-preview grid-container">
        <SectionTitle title="Latest News" link="#/news" linkText="See More" />
        <div className="carousel-row">
          <button className="round-nav" onClick={() => setSlide((slide + news.length - 1) % news.length)}>‹</button>
          {shownNews.map((item) => <NewsCard key={item.slug} item={item} compact />)}
          <button className="round-nav" onClick={() => setSlide((slide + 1) % news.length)}>›</button>
        </div>
        <div className="dots">{news.slice(0, 5).map((_, i) => <button key={i} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} />)}</div>
      </section>

      <MakeRequestBlock request={request} openRequest={openRequest} />
    </>
  );
}

function About() {
  return (
    <Shell title="About Us">
      <div className="about-grid">
        <div className="white-box large-copy">
          <h2>Japanese industrial equipment for the European market</h2>
          <p>Feroxo Welding S.R.O. supplies professional welding generators and industrial power equipment for rail, pipeline, petro-chemical, rental and contractor applications across Europe.</p>
          <p>The visual language follows the supplied Figma design: strong red surfaces, rounded industrial cards, heavy uppercase headings and clean technical product presentation.</p>
        </div>
        <img className="rounded-img" src={img('hero-truck.jpg')} alt="Feroxo field service truck" />
      </div>
      <div className="three-info">
        <InfoBox title="Industrial power solutions for Europe" text="Equipment selected for reliability in harsh field conditions and long operating cycles." />
        <InfoBox title="European service support" text="Technical support, spare parts availability and warranty coverage for demanding environments." />
        <InfoBox title="Need help choosing equipment?" text="The request flow helps clients send their equipment needs and product list to the Feroxo team." />
      </div>
    </Shell>
  );
}

function Service({ request, openRequest }) {
  return (
    <>
      <section className="service-hero grid-container">
        <div className="service-slider">
          <img src={img('hero-truck.jpg')} alt="Industrial equipment on pickup" />
          <div className="slide-dots"><span /><span /><span /><span /></div>
        </div>
      </section>
      <section className="strengths service-strengths grid-container">
        <article className="image-card japan-card">
          <img src={img('engineered-japan.jpg')} alt="Generator controls" />
          <div><h3>Engineered in Japan</h3><p>Developed on proven Shindaiwa principles for stable output and long service life.</p></div>
        </article>
        <div className="strength-pills red-pills">{features.map((item) => <span key={item}>{item}</span>)}</div>
        <h2 className="vertical-title">Strengths</h2>
      </section>
      <section className="industries grid-container">
        <div className="side-word">Industries<br />we serve</div>
        <div className="industry-grid">
          {serviceCards.map((c) => <IndustryCard key={c.title} {...c} />)}
        </div>
      </section>
      <section className="industry-callout grid-container">
        <div className="white-box cut-box"><h2>Built for<br />Industry</h2><p>Service-ready power equipment for professionals working in real field conditions.</p><a className="primary" href="#/products">See Equipment</a></div>
        <VideoCard image={img('field-pipeline.png')} />
      </section>
      <MakeRequestBlock request={request} openRequest={openRequest} />
    </>
  );
}

function Products({ request, openRequest }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter);
  return (
    <Shell title="Products">
      <div className="category-strip">
        {categories.map((cat) => (
          <button key={cat.title} className={filter === cat.filter ? 'active' : ''} onClick={() => setFilter(cat.filter)}>
            <img src={cat.image} alt="" /><span>{cat.title}</span>
          </button>
        ))}
      </div>
      <ProductGrid products={filtered} request={request} openRequest={openRequest} />
    </Shell>
  );
}

function ProductGrid({ products, request, openRequest }) {
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.slug} product={product} request={request} openRequest={openRequest} />)}</div>;
}

function ProductCard({ product, request, openRequest }) {
  return (
    <article className="product-card">
      <a href={`#/products/${product.slug}`} className="product-image"><img src={product.image} alt={product.name} /></a>
      <div className="product-body">
        <a className="product-title" href={`#/products/${product.slug}`}>{product.name}</a>
        <p>{product.type} | Part No. {product.partNo}</p>
        <dl>{product.specs.slice(0, 3).map(([k, v]) => <React.Fragment key={k}><dt>{k}</dt><dd>{v}</dd></React.Fragment>)}</dl>
        <button className="primary full" onClick={() => { request.add(product); openRequest(); }}>Add to Request</button>
      </div>
    </article>
  );
}

function ProductDetail({ slug, request, openRequest }) {
  const product = products.find((p) => p.slug === slug) || products[2];
  const [index, setIndex] = useState(0);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const similar = products.filter((p) => p.category === product.category && p.slug !== product.slug).concat(products).slice(0, 3);
  return (
    <section className="product-detail page-shell compact">
      <Breadcrumb items={['Products', product.category, product.name]} />
      <div className="detail-grid">
        <div className="gallery white-box">
          <img src={product.gallery[index]} alt={product.name} />
          <button className="gallery-nav left" onClick={() => setIndex((index + product.gallery.length - 1) % product.gallery.length)}>‹</button>
          <button className="gallery-nav right" onClick={() => setIndex((index + 1) % product.gallery.length)}>›</button>
          <div className="thumbs">{product.gallery.map((g, i) => <button key={g} className={i === index ? 'active' : ''} onClick={() => setIndex(i)}><img src={g} alt="" /></button>)}</div>
        </div>
        <div className="detail-copy">
          <h1>{product.name}</h1>
          <p className="muted">{product.type}</p>
          <p>{product.details} Combining reliable welding performance with auxiliary power generation, this unit enables efficient operation in remote locations and on demanding job sites.</p>
          <Accordion title="Performance & Benefits" open>
            <ul><li>Stable DC welding performance</li><li>Fuel-efficient engine</li><li>Integrated auxiliary power output</li><li>Rugged construction for demanding environments</li></ul>
          </Accordion>
          <Accordion title="Typical Applications"><ul><li>Construction and infrastructure projects</li><li>Pipeline and maintenance work</li><li>Industrial fabrication</li><li>Remote and off-grid locations</li></ul></Accordion>
          <Accordion title="Key Features"><ul><li>Adjustable welding current</li><li>Heavy-duty industrial design</li><li>Reliable operation in remote locations</li></ul></Accordion>
          <Accordion title="Why choose this model"><ul><li>Stage V compliant</li><li>Water-cooled engine options</li><li>European service support</li></ul></Accordion>
        </div>
        <aside className="detail-panel white-box">
          <SpecRow label="Status" value="In Stock" strong />
          <SpecRow label="Country Of Origin" value="Japan" />
          <SpecRow label="Guarantee" value="3 Years" />
          <SpecRow label="Part No." value={product.partNo} />
          <button>Technical Specifications ›</button>
          <button>Instructions for Exposure ›</button>
          <button>Machine's Passport ›</button>
          <button className="primary full" onClick={() => { request.add(product); openRequest(); }}>Add Request</button>
        </aside>
      </div>
      <SectionTitle title="Related Accessories" />
      <ProductGrid products={related} request={request} openRequest={openRequest} />
      <SectionTitle title="Similar Items" />
      <ProductGrid products={similar} request={request} openRequest={openRequest} />
    </section>
  );
}

function News() {
  const [tag, setTag] = useState('All');
  const tags = ['All', ...Array.from(new Set(news.map((n) => n.tag)))];
  const list = tag === 'All' ? news : news.filter((n) => n.tag === tag);
  return (
    <Shell title="News">
      <div className="filters">{tags.map((t) => <button key={t} className={tag === t ? 'active' : ''} onClick={() => setTag(t)}>{t}</button>)}</div>
      <div className="news-grid">{list.map((item) => <NewsCard key={item.slug} item={item} />)}</div>
    </Shell>
  );
}

function NewsDetail({ slug }) {
  const item = news.find((n) => n.slug === slug) || news[0];
  return (
    <section className="page-shell compact article-page">
      <Breadcrumb items={['News', item.title]} />
      <article className="white-box article-box">
        <img src={item.image} alt={item.title} />
        <span className="tag">{item.tag}</span>
        <h1>{item.title}</h1>
        <p>{item.text}</p>
        <p>Feroxo equipment is selected for stable output, simple service access, and dependable performance in industrial locations. This page is prepared as a content-ready template: the client can replace the demo article text with final marketing copy.</p>
        <a className="primary" href="#/news">Back to news</a>
      </article>
    </section>
  );
}

function Contact({ request, openRequest }) {
  return (
    <Shell title="Contact">
      <div className="contact-layout">
        <div className="contact-list">
          <ContactItem icon="⌖" title="Address" text="Feroxo S.R.O., Průmyslová 1234/12, 110 00 Prague, Czech Republic" />
          <ContactItem icon="✉" title="Email" text="sales@feroxo.com" />
          <ContactItem icon="☏" title="Phone" text="+420 000 000 000" />
          <ContactItem icon="◷" title="Business Hours" text="Mon–Fri, 08:00–17:00 CET" />
        </div>
        <div className="map-card"><img src={img('map.png')} alt="Feroxo office map" /></div>
      </div>
      <div className="three-info">
        <InfoBox title="Industrial power solutions for Europe" text="Feroxo supplies professional welding generators and industrial power equipment for demanding field applications." />
        <InfoBox title="European service support" text="Technical support, spare parts availability and responsive after-sales assistance." />
        <InfoBox title="Need help choosing equipment?" text="Our team can select the right solution based on project requirements and operating conditions." />
      </div>
      <MakeRequestBlock request={request} openRequest={openRequest} />
    </Shell>
  );
}

function RequestPage({ request }) {
  return <section className="page-shell compact"><RequestForm request={request} standalone /></section>;
}

function MakeRequestBlock({ request, openRequest }) {
  return (
    <section className="request-block grid-container">
      <div>
        <h2>Make<br />Request</h2>
        <p>Select equipment and send a quick request. The form keeps selected products in the browser so the client can continue browsing before sending.</p>
        <button className="primary" onClick={openRequest}>Send Request</button>
        <small>By submitting this form you agree to our Privacy Policy. We never share data with third parties.</small>
      </div>
      <RequestForm request={request} compact />
    </section>
  );
}

function RequestModal({ request, onClose }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <button className="close" onClick={onClose}>×</button>
        <RequestForm request={request} standalone />
      </div>
    </div>
  );
}

function RequestForm({ request, compact = false, standalone = false }) {
  const [form, setForm] = useState({ fullName: '', company: '', email: '', phone: '', project: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const update = (key, value) => setForm({ ...form, [key]: value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.includes('@') || form.phone.replace(/\D/g, '').length < 7) {
      setError('Please fill Full Name, valid Email and Phone Number.');
      return;
    }
    const payload = { ...form, products: request.list.map((p) => p.name), createdAt: new Date().toISOString() };
    localStorage.setItem('feroxo-last-request', JSON.stringify(payload, null, 2));
    setError('');
    setSent(true);
  };
  return (
    <form className={`request-form ${compact ? 'compact' : ''}`} onSubmit={submit}>
      {standalone && <><h2>Make Request</h2><p className="muted">Selected equipment will be included in the request.</p></>}
      <div className="form-grid">
        <label>Full Name<input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder="Text" /></label>
        <label>Company Name<input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Text" /></label>
        <label>Email<input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Text" /></label>
        <label>Phone Number<input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Text" /></label>
      </div>
      <div className="selected-equipment">
        <span>Selected Equipment</span>
        <div className="selected-list">
          {request.list.length === 0 && <em>No equipment selected yet</em>}
          {request.list.map((p) => <button key={p.slug} type="button" onClick={() => request.remove(p.slug)} title="Remove"><img src={p.image} alt="" /><span>×</span></button>)}
          <a href="#/products" className="add-more">+</a>
        </div>
      </div>
      <label>Project Details<textarea value={form.project} onChange={(e) => update('project', e.target.value)} placeholder="Text" /></label>
      {error && <p className="form-error">{error}</p>}
      {sent && <p className="form-success">Request saved successfully. Backend/email integration can be connected in the next step.</p>}
      <button className="primary" type="submit">Send Request</button>
    </form>
  );
}

function Footer() {
  return (
    <footer className="footer grid-container">
      <div className="footer-brand"><a className="logo white" href="#/">Feroxo</a><p>Premium Japanese industrial<br />equipment for the European market</p><div className="socials"><span>◎</span><span>f</span><span>in</span><span>▶</span></div></div>
      {[1, 2, 3].map((i) => <div key={i}><h4>Lorem ipsum</h4><a>Products</a><a>Service support</a><a>News</a><a>Contact</a><a>Request</a></div>)}
      <small>© 2026 Feroxo Welding S.R.O. All Rights Reserved</small>
    </footer>
  );
}

function SectionTitle({ title, link, linkText }) {
  return <div className="section-title"><h2>{title}</h2>{link && <a href={link}>{linkText}</a>}</div>;
}

function NewsCard({ item, compact = false }) {
  return (
    <article className={`news-card ${compact ? 'compact' : ''}`}>
      <img src={item.image} alt={item.title} />
      <div><span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p><a href={`#/news/${item.slug}`}>Read More</a></div>
    </article>
  );
}

function VideoCard({ image }) {
  return <div className="video-card"><img src={image} alt="Pipeline welding field work" /><button>▶</button></div>;
}

function IndustryCard({ title, image, text }) {
  return <article className="industry-card"><img src={image} alt={title} /><div><h3>{title}</h3><p>{text}</p></div></article>;
}

function InfoBox({ title, text }) {
  return <article><h3>{title}</h3><p>{text}</p></article>;
}

function ContactItem({ icon, title, text }) {
  return <div className="contact-item"><span>{icon}</span><div><h3>{title}</h3><p>{text}</p></div></div>;
}

function Breadcrumb({ items }) {
  return <div className="breadcrumb"><a href="#/">⌂</a>{items.map((i, idx) => <React.Fragment key={i}><span>/</span><b>{i}</b></React.Fragment>)}</div>;
}

function Accordion({ title, children, open = false }) {
  const [isOpen, setOpen] = useState(open);
  return <div className="accordion"><button onClick={() => setOpen(!isOpen)}><strong>{title}</strong><span>{isOpen ? '⌃' : '⌄'}</span></button>{isOpen && <div>{children}</div>}</div>;
}

function SpecRow({ label, value, strong }) {
  return <div className="spec-row"><span>{label}</span><b className={strong ? 'green' : ''}>{value}</b></div>;
}

createRoot(document.getElementById('root')).render(<App />);
