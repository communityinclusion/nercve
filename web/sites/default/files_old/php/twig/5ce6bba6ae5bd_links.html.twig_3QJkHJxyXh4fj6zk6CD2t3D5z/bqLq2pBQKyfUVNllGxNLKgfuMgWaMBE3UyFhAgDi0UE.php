<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/contrib/bootstrap_barrio/templates/navigation/links.html.twig */
class __TwigTemplate_2604a0139c1f9ec216cf005944c1b493b4743952ac9f8b50455c8c7947740b41 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 35, "for" => 46];
        $filters = ["escape" => 36, "clean_class" => 47];
        $functions = ["attach_library" => 36];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'for'],
                ['escape', 'clean_class'],
                ['attach_library']
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453 = $this->env->getExtension("Drupal\\webprofiler\\Twig\\Extension\\ProfilerExtension");
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453->enter($__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "themes/contrib/bootstrap_barrio/templates/navigation/links.html.twig"));

        // line 35
        if (($context["links"] ?? null)) {
            // line 36
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->env->getExtension('Drupal\Core\Template\TwigExtension')->attachLibrary("bootstrap_barrio/links"), "html", null, true);
            // line 38
            if (($context["heading"] ?? null)) {
                // line 39
                if ($this->getAttribute(($context["heading"] ?? null), "level", [])) {
                    // line 40
                    echo "<";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["heading"] ?? null), "level", [])), "html", null, true);
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["heading"] ?? null), "attributes", [])), "html", null, true);
                    echo ">";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["heading"] ?? null), "text", [])), "html", null, true);
                    echo "</";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["heading"] ?? null), "level", [])), "html", null, true);
                    echo ">";
                } else {
                    // line 42
                    echo "<h2";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["heading"] ?? null), "attributes", [])), "html", null, true);
                    echo ">";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["heading"] ?? null), "text", [])), "html", null, true);
                    echo "</h2>";
                }
            }
            // line 45
            echo "<ul";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["attributes"] ?? null)), "html", null, true);
            echo ">";
            // line 46
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["links"] ?? null));
            foreach ($context['_seq'] as $context["key"] => $context["item"]) {
                // line 47
                echo "<li";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($this->getAttribute($context["item"], "attributes", []), "addClass", [0 => \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed($context["key"]))], "method")), "html", null, true);
                echo ">";
                // line 48
                if ($this->getAttribute($context["item"], "link", [])) {
                    // line 49
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "link", [])), "html", null, true);
                } elseif ($this->getAttribute(                // line 50
$context["item"], "text_attributes", [])) {
                    // line 51
                    echo "<span";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "text_attributes", [])), "html", null, true);
                    echo ">";
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "text", [])), "html", null, true);
                    echo "</span>";
                } else {
                    // line 53
                    echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "text", [])), "html", null, true);
                }
                // line 55
                echo "</li>";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['key'], $context['item'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 57
            echo "</ul>";
        }
        
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453->leave($__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453_prof);

    }

    public function getTemplateName()
    {
        return "themes/contrib/bootstrap_barrio/templates/navigation/links.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  118 => 57,  112 => 55,  109 => 53,  102 => 51,  100 => 50,  98 => 49,  96 => 48,  92 => 47,  88 => 46,  84 => 45,  76 => 42,  66 => 40,  64 => 39,  62 => 38,  60 => 36,  58 => 35,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("{#
/**
 * @file
 * Theme override for a set of links.
 *
 * Available variables:
 * - attributes: Attributes for the UL containing the list of links.
 * - links: Links to be output.
 *   Each link will have the following elements:
 *   - title: The link text.
 *   - href: The link URL. If omitted, the 'title' is shown as a plain text
 *     item in the links list. If 'href' is supplied, the entire link is passed
 *     to l() as its \$options parameter.
 *   - attributes: (optional) HTML attributes for the anchor, or for the <span>
 *     tag if no 'href' is supplied.
 *   - link_key: The link CSS class.
 * - heading: (optional) A heading to precede the links.
 *   - text: The heading text.
 *   - level: The heading level (e.g. 'h2', 'h3').
 *   - attributes: (optional) A keyed list of attributes for the heading.
 *   If the heading is a string, it will be used as the text of the heading and
 *   the level will default to 'h2'.
 *
 *   Headings should be used on navigation menus and any list of links that
 *   consistently appears on multiple pages. To make the heading invisible use
 *   the 'sr-only' CSS class. Do not use 'display:none', which
 *   removes it from screen readers and assistive technology. Headings allow
 *   screen reader and keyboard only users to navigate to or skip the links.
 *   See http://juicystudio.com/article/screen-readers-display-none.php and
 *   http://www.w3.org/TR/WCAG-TECHS/H42.html for more information.
 *
 * @see template_preprocess_links()
 */
#}
{% if links -%}
  {{ attach_library('bootstrap_barrio/links') }}

  {%- if heading -%}
    {%- if heading.level -%}
      <{{ heading.level }}{{ heading.attributes }}>{{ heading.text }}</{{ heading.level }}>
    {%- else -%}
      <h2{{ heading.attributes }}>{{ heading.text }}</h2>
    {%- endif -%}
  {%- endif -%}
  <ul{{ attributes }}>
    {%- for key, item in links -%}
      <li{{ item.attributes.addClass(key|clean_class) }}>
        {%- if item.link -%}
          {{ item.link }}
        {%- elseif item.text_attributes -%}
          <span{{ item.text_attributes }}>{{ item.text }}</span>
        {%- else -%}
          {{ item.text }}
        {%- endif -%}
      </li>
    {%- endfor -%}
  </ul>
{%- endif %}
", "themes/contrib/bootstrap_barrio/templates/navigation/links.html.twig", "/var/www/html_nercve8/web/themes/contrib/bootstrap_barrio/templates/navigation/links.html.twig");
    }
}
