import {
  faApple,
  faGooglePlay,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faEnvelope,
  faLeaf,
  faMobileScreenButton,
  faTag,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Newsletter() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="rounded-[38px] border border-emerald-100bg-linear-to-br  from-white to-emerald-50 px-16 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-9 items-center">

            {/* Newsletter */}
            <div className="pr-8 lg:border-r lg:border-emerald-100">
              <div className="flex items-center gap-5 mb-8">
                <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-2xl"
                  />
                </div>

                <div>
                  <p className="text-emerald-600 font-semibold text-base">
                    NEWSLETTER
                  </p>

                  <p className="text-gray-500 text-sm">
                    50,000+ subscribers
                  </p>
                </div>
              </div>

              <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-5">
                Get the Freshest Updates{" "}
                <span className="text-emerald-600">
                  Delivered Free
                </span>
              </h2>

              <p className="text-gray-500 text-lg mb-7">
                Weekly recipes, seasonal offers & exclusive member perks.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-2 shadow-sm">
                  <span className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <FontAwesomeIcon icon={faLeaf} />
                  </span>

                  <span className="text-gray-600 text-sm">
                    Fresh Picks Weekly
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-2 shadow-sm">
                  <span className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <FontAwesomeIcon icon={faTruck} />
                  </span>

                  <span className="text-gray-600 text-sm">
                    Free Delivery Codes
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-emerald-100 bg-white px-4 py-2 shadow-sm">
                  <span className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <FontAwesomeIcon icon={faTag} />
                  </span>

                  <span className="text-gray-600 text-sm">
                    Members-Only Deals
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 h-16.5 rounded-2xl border border-gray-200 bg-white px-6 text-lg text-gray-700 outline-none shadow-sm focus:border-emerald-500"
                />

                <button className="h-16.5 px-8 rounded-2xl bg-emerald-600 text-white font-semibold text-lg flex items-center gap-4 shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition">
                  Subscribe
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                ✨ Unsubscribe anytime. No spam, ever.
              </p>
            </div>

            {/* Mobile App */}
            <div className="rounded-[28px] bg-slate-900 px-9 py-9 text-whitemin-h-110  flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-emerald-400 text-sm font-semibold mb-6">
                  <FontAwesomeIcon icon={faMobileScreenButton} />
                  MOBILE APP
                </div>

                <h3 className="text-3xl font-bold mb-5">
                  Shop Faster on Our App
                </h3>

                <p className="text-gray-400 text-base mb-8">
                  Get app-exclusive deals & 15% off your first order.
                </p>

                <div className="space-y-3">
                  <a
                    href="#"
                    className="flex items-center gap-5 rounded-2xl bg-slate-700/80 border border-slate-600 px-5 py-4"
                  >
                    <FontAwesomeIcon
                      icon={faApple}
                      className="text-3xl"
                    />

                    <div>
                      <p className="text-xs text-gray-400 uppercase">
                        Download on
                      </p>

                      <p className="font-semibold text-base">
                        App Store
                      </p>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-5 rounded-2xl bg-slate-700/80 border border-slate-600 px-5 py-4"
                  >
                    <FontAwesomeIcon
                      icon={faGooglePlay}
                      className="text-3xl"
                    />

                    <div>
                      <p className="text-xs text-gray-400 uppercase">
                        Get it on
                      </p>

                      <p className="font-semibold text-base">
                        Google Play
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="text-yellow-400 text-lg">
                  ★★★★★
                </span>

                <span className="text-gray-400">
                  4.9 · 100K+ downloads
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}