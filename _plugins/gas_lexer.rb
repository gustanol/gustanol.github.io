# Just for debug (keep it)
puts "GAS lexer loaded"

require 'rouge'

module Rouge
  module Lexers
    class GAS < RegexLexer
      title "GNU Assembler"
      desc "The GNU Assembler (GAS) syntax"
      tag 'gas'
      filenames '*.s', '*.S'
      mimetypes 'text/x-gas'

      state :root do

        # Whitespace
        rule %r{\s+}, Text
        
        # Comments
        rule %r{[#].*}, Comment::Single
        
        # Directives (e.g. .global, .text, .ascii)
        rule %r{\.[a-z][a-z0-9_]*}, Keyword::Pseudo
        
        # Opcodes (Instructions) - case insensitive
        # We use \b to ensure we match whole words only
        rule %r{[a-z_][a-z0-9]*\b}i, Name::Function
        
        # Registers (e.g. %rax, %eax, %al)
        rule %r{%[a-z0-9]+}, Name::Variable
        
        # Numbers (Hex and Decimal)
        rule %r{\$?0x[0-9a-fA-F]+}, Literal::Number::Hex
        rule %r{\$?\d+}, Literal::Number::Integer
        
        # Labels
        rule %r{^[a-z_][a-z0-9_]*:}, Name::Label
        
        # Strings
        rule %r{"(\\\\|\\"|[^"])*"}, String
        
        # Punctuation (commas, parentheses for addressing)
        rule %r{[,():]}, Punctuation
      end
    end
  end
end

Rouge::Lexer.send(:register, 'gas', Rouge::Lexers::GAS)
