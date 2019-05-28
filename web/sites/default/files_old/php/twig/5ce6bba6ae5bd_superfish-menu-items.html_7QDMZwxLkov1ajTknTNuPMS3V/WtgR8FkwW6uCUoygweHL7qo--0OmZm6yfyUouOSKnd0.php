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

/* modules/contrib/superfish/templates/superfish-menu-items.html.twig */
class __TwigTemplate_d87b4cef5c5134707e5cfc0c36c1ac34c2c965a9cceedbaf4cd161c93c4e4988 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 22, "spaceless" => 23, "for" => 24, "if" => 26];
        $filters = ["escape" => 33];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'spaceless', 'for', 'if'],
                ['escape'],
                []
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
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453->enter($__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "modules/contrib/superfish/templates/superfish-menu-items.html.twig"));

        // line 21
        echo "
";
        // line 22
        $context["classes"] = [];
        // line 23
        ob_start();
        // line 24
        $context['_parent'] = $context;
        $context['_seq'] = twig_ensure_traversable(($context["menu_items"] ?? null));
        foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
            // line 25
            echo "
  ";
            // line 26
            if ( !twig_test_empty($this->getAttribute($context["item"], "children", []))) {
                // line 27
                echo "    ";
                $context["item_class"] = ($this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "item_class", [])) . " menuparent");
                // line 28
                echo "    ";
                if ($this->getAttribute($context["item"], "multicolumn_column", [])) {
                    // line 29
                    echo "      ";
                    $context["item_class"] = ($this->sandbox->ensureToStringAllowed(($context["item_class"] ?? null)) . " sf-multicolumn-column");
                    // line 30
                    echo "    ";
                }
                // line 31
                echo "  ";
            }
            // line 32
            echo "
  <li";
            // line 33
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "attributes", [])), "html", null, true);
            echo ">
    ";
            // line 34
            if ($this->getAttribute($context["item"], "multicolumn_column", [])) {
                // line 35
                echo "    <div class=\"sf-multicolumn-column\">
    ";
            }
            // line 37
            echo "    ";
            if ( !twig_test_empty($this->getAttribute($context["item"], "children", []))) {
                // line 38
                echo "      ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "link_menuparent", [])), "html", null, true);
                echo "
    ";
            } else {
                // line 40
                echo "      ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "link", [])), "html", null, true);
                echo "
    ";
            }
            // line 42
            echo "    ";
            if ($this->getAttribute($context["item"], "multicolumn_wrapper", [])) {
                echo "<ul class=\"sf-multicolumn\">
    <li class=\"sf-multicolumn-wrapper ";
                // line 43
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "item_class", [])), "html", null, true);
                echo "\">
    ";
            }
            // line 45
            echo "    ";
            if ( !twig_test_empty($this->getAttribute($context["item"], "children", []))) {
                // line 46
                echo "      ";
                if ($this->getAttribute($context["item"], "multicolumn_content", [])) {
                    echo "<ol>";
                } else {
                    echo "<ul>";
                }
                // line 47
                echo "      ";
                echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute($context["item"], "children", [])), "html", null, true);
                echo "
      ";
                // line 48
                if ($this->getAttribute($context["item"], "multicolumn_content", [])) {
                    echo "</ol>";
                } else {
                    echo "</ul>";
                }
                // line 49
                echo "    ";
            }
            // line 50
            echo "    ";
            if ($this->getAttribute($context["item"], "multicolumn_wrapper", [])) {
                echo "</li></ul>";
            }
            // line 51
            echo "    ";
            if ($this->getAttribute($context["item"], "multicolumn_column", [])) {
                echo "</div>";
            }
            // line 52
            echo "  </li>

";
        }
        $_parent = $context['_parent'];
        unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
        $context = array_intersect_key($context, $_parent) + $_parent;
        echo trim(preg_replace('/>\s+</', '><', ob_get_clean()));
        
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453->leave($__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453_prof);

    }

    public function getTemplateName()
    {
        return "modules/contrib/superfish/templates/superfish-menu-items.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  161 => 52,  156 => 51,  151 => 50,  148 => 49,  142 => 48,  137 => 47,  130 => 46,  127 => 45,  122 => 43,  117 => 42,  111 => 40,  105 => 38,  102 => 37,  98 => 35,  96 => 34,  92 => 33,  89 => 32,  86 => 31,  83 => 30,  80 => 29,  77 => 28,  74 => 27,  72 => 26,  69 => 25,  65 => 24,  63 => 23,  61 => 22,  58 => 21,);
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
 * Default theme implementation of Superfish menu items.
 *
 * Available variables:
 * - html_id: Unique menu item identifier.
 * - item_class: Menu item classes.
 * - link: Link element.
 * - link_menuparent: Link element, when a menu parent.
 * - children: Menu item children.
 * - multicolumn_wrapper: Whether the menu item contains a column.
 * - multicolumn_column: Whether the menu item contains a column.
 * - multicolumn_content: Whether the menu item contains a column.
 *
 * @see template_preprocess_superfish_menu_items()
 *
 * @ingroup themeable
 */
#}

{% set classes = [] %}
{% spaceless %}
{% for item in menu_items %}

  {% if item.children is not empty %}
    {% set item_class = item.item_class ~ ' menuparent' %}
    {% if item.multicolumn_column %}
      {% set item_class = item_class ~ ' sf-multicolumn-column' %}
    {% endif %}
  {% endif %}

  <li{{ item.attributes }}>
    {% if item.multicolumn_column %}
    <div class=\"sf-multicolumn-column\">
    {% endif %}
    {% if item.children is not empty %}
      {{ item.link_menuparent }}
    {% else %}
      {{ item.link }}
    {% endif %}
    {% if item.multicolumn_wrapper %}<ul class=\"sf-multicolumn\">
    <li class=\"sf-multicolumn-wrapper {{ item.item_class }}\">
    {% endif %}
    {% if item.children is not empty %}
      {% if item.multicolumn_content %}<ol>{% else %}<ul>{% endif %}
      {{ item.children }}
      {% if item.multicolumn_content %}</ol>{% else %}</ul>{% endif %}
    {% endif %}
    {% if item.multicolumn_wrapper %}</li></ul>{% endif %}
    {% if item.multicolumn_column %}</div>{% endif %}
  </li>

{% endfor %}
{% endspaceless %}
", "modules/contrib/superfish/templates/superfish-menu-items.html.twig", "/var/www/html_nercve8/web/modules/contrib/superfish/templates/superfish-menu-items.html.twig");
    }
}
